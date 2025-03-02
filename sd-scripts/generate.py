import torch
from diffusers import StableDiffusionPipeline
from flask import Flask, request, jsonify
import os
import logging

app = Flask(__name__)

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ImageGenerator:
    def __init__(self):
        logger.info("正在初始化 Stable Diffusion 模型...")
        model_path = "./models"  # 指向你下载模型的本地路径
        self.pipe = StableDiffusionPipeline.from_pretrained(
            model_path,
            torch_dtype=torch.float16
        )
        
        if torch.cuda.is_available():
            self.pipe = self.pipe.to("cuda")
            logger.info("模型已加载到 GPU")
        else:
            logger.info("未检测到 GPU，使用 CPU 模式")
        
        logger.info("模型初始化完成")

    def generate(self, prompt: str, output_dir: str, negative_prompt: str = None) -> str:
        logger.info(f"生成图片，提示词: {prompt}")
        logger.info(f"负面提示词: {negative_prompt}")
        
        # 优化参数设置
        image = self.pipe(
            prompt=prompt,
            num_inference_steps=40,      # 40步是细节和速度的良好平衡
            guidance_scale=7.5,          # 7.5是创意性和准确度的平衡点
            width=768,                   # 保持768x768的正方形比例适合手串展示
            height=768,
            negative_prompt=negative_prompt,
        ).images[0]
        
        # 保存为高质量PNG
        output_path = os.path.join(output_dir, f"generated_{hash(prompt)}.png")
        image.save(output_path, "PNG", quality=100)
        
        return output_path

# 全局的生成器实例
generator = ImageGenerator()

@app.route('/generate', methods=['POST'])
def generate_image():
    try:
        data = request.get_json()
        prompt = data.get('prompt')
        output_dir = data.get('output_dir')
        negative_prompt = data.get('negative_prompt')

        if not prompt or not output_dir:
            return jsonify({'error': '缺少必要参数'}), 400

        output_path = generator.generate(prompt, output_dir, negative_prompt)
        return jsonify({'output_path': output_path})

    except Exception as e:
        logger.error(f"生成过程出错: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    # 设置服务器端口，默认在本地运行
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port) 