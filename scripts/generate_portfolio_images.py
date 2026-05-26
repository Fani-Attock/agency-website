from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('src/assets/project-images', exist_ok=True)
images = [
    ('dehaze-simulation-ui.png', 'Dehaze & Simulation', 'Fog reduction dashboard with alerts'),
    ('smart-support-bot-ui.png', 'Smart Support Bot', 'Chat automation + analytics UI'),
    ('predictive-insight-ui.png', 'Predictive Insight', 'Forecast trends, alerts, and KPIs'),
    ('voice-assistant-ui.png', 'Voice Assistant', 'Call flows, transcripts, and booking'),
]

font = None
for candidate in ['arial.ttf', 'DejaVuSans.ttf']:
    try:
        font = ImageFont.truetype(candidate, 48)
        break
    except Exception:
        continue
if font is None:
    font = ImageFont.load_default()

for filename, title, subtitle in images:
    img = Image.new('RGB', (1200, 720), '#0a1120')
    draw = ImageDraw.Draw(img)
    for i in range(img.height):
        r = int(10 + (20 - 10) * i / img.height)
        g = int(17 + (90 - 17) * i / img.height)
        b = int(32 + (150 - 32) * i / img.height)
        draw.line([(0, i), (img.width, i)], fill=(r, g, b))
    header = Image.new('RGBA', (img.width - 120, 180), (255, 255, 255, 18))
    hdr_draw = ImageDraw.Draw(header)
    hdr_draw.rectangle([0, 0, header.width, header.height], fill=(255, 255, 255, 18))
    img.paste(header, (60, 60), header)
    draw.text((80, 90), title, font=font, fill=(255, 255, 255))
    small_font = None
    try:
        small_font = ImageFont.truetype(font.path, 32) if hasattr(font, 'path') else font
    except Exception:
        small_font = font
    draw.text((80, 150), subtitle, font=small_font, fill=(200, 220, 255))
    card_colors = ['#12c2e9', '#c471ed', '#f64f59']
    labels = ['Live Alerts', 'Scoreboard', 'Actions']
    for idx, y in enumerate([320, 430, 540]):
        x = 80
        w, h = 1040, 70
        draw.rounded_rectangle([x, y, x + w, y + h], radius=24, fill=(255, 255, 255, 20), outline=(255, 255, 255, 60), width=2)
        draw.text((x + 30, y + 18), labels[idx], font=small_font, fill=(255, 255, 255))
        draw.rectangle([x + w - 200, y + 20, x + w - 40, y + h - 20], fill=card_colors[idx])
    path = os.path.join('src/assets/project-images', filename)
    img.save(path)
    print('created', path)
