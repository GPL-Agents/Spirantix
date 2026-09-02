from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "spirantix-classes-and-talks.pdf"

NAVY = HexColor("#1f2a44")
INK = HexColor("#293449")
SOFT = HexColor("#5c6575")
TEAL = HexColor("#2bae9e")
TEAL_DARK = HexColor("#187e73")
MINT = HexColor("#8fe0c6")
MINT_PALE = HexColor("#eefaf7")
BLUE = HexColor("#2368a8")
BLUE_PALE = HexColor("#eef5fb")
ORANGE = HexColor("#f15a24")
LINE = HexColor("#dce3e6")


def draw_pinwheel(pdf, x, y, scale=1.0):
    colors = [MINT, HexColor("#4fc9b5"), TEAL, HexColor("#2e8fb8"), BLUE, HexColor("#1b4e82")]
    for angle, color in zip(range(0, 360, 60), colors):
        pdf.saveState()
        pdf.translate(x, y)
        pdf.rotate(angle)
        pdf.setFillColor(color)
        pdf.setStrokeColor(color)
        pdf.ellipse(3 * scale, -5 * scale, 31 * scale, 7 * scale, fill=1, stroke=0)
        pdf.restoreState()
    pdf.setFillColor(white)
    pdf.circle(x, y, 5.5 * scale, fill=1, stroke=0)
    pdf.setFillColor(TEAL)
    pdf.circle(x, y, 2.5 * scale, fill=1, stroke=0)


def draw_paragraph(pdf, text, x, y_top, width, style):
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(width, 200)
    paragraph.drawOn(pdf, x, y_top - height)
    return height


def draw_label(pdf, text, x, y):
    pdf.setFillColor(TEAL_DARK)
    pdf.setFont("Helvetica-Bold", 8.5)
    pdf.drawString(x, y, text.upper())


def draw_check_item(pdf, text, x, y, width):
    pdf.setFillColor(TEAL)
    pdf.circle(x + 5, y - 4, 5, fill=1, stroke=0)
    pdf.setStrokeColor(white)
    pdf.setLineWidth(1.2)
    pdf.line(x + 2.3, y - 4.1, x + 4.5, y - 6.3)
    pdf.line(x + 4.5, y - 6.3, x + 8.3, y - 1.8)
    style = ParagraphStyle(
        "check",
        fontName="Helvetica",
        fontSize=9.4,
        leading=12.5,
        textColor=INK,
        spaceAfter=0,
    )
    return draw_paragraph(pdf, text, x + 18, y + 2, width - 18, style)


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter)
    width, height = letter
    pdf.setTitle("Spirantix Classes and Talks")
    pdf.setAuthor("Spirantix")
    pdf.setSubject("Practical AI learning sessions for senior communities and lifelong learning centers")

    pdf.setFillColor(white)
    pdf.rect(0, 0, width, height, fill=1, stroke=0)

    pdf.setFillColor(MINT_PALE)
    pdf.roundRect(28, height - 205, width - 56, 177, 20, fill=1, stroke=0)
    pdf.setFillColor(BLUE_PALE)
    pdf.circle(width - 30, height - 20, 92, fill=1, stroke=0)
    draw_pinwheel(pdf, 73, height - 80, 0.72)

    pdf.setFillColor(NAVY)
    pdf.setFont("Helvetica-Bold", 19)
    pdf.drawString(113, height - 69, "Spirantix")
    pdf.setFillColor(TEAL)
    pdf.drawString(190, height - 69, ".ai")

    title_style = ParagraphStyle(
        "title",
        fontName="Helvetica-Bold",
        fontSize=25,
        leading=28.5,
        textColor=NAVY,
        alignment=TA_LEFT,
    )
    draw_paragraph(pdf, "Bring practical AI learning<br/>to your community", 50, height - 102, 410, title_style)
    intro_style = ParagraphStyle(
        "intro",
        fontName="Helvetica",
        fontSize=11.5,
        leading=15,
        textColor=INK,
    )
    draw_paragraph(
        pdf,
        "Friendly, plain-language sessions help seniors understand today's AI tools, use them with confidence, and protect important information.",
        50,
        height - 169,
        485,
        intro_style,
    )

    left_x, right_x = 48, 326
    left_w, right_w = 238, 238
    top = height - 239

    draw_label(pdf, "Flexible formats", left_x, top)
    heading_style = ParagraphStyle(
        "heading",
        fontName="Helvetica-Bold",
        fontSize=16,
        leading=19,
        textColor=NAVY,
    )
    body_style = ParagraphStyle(
        "body",
        fontName="Helvetica",
        fontSize=9.6,
        leading=13.2,
        textColor=INK,
    )
    small_style = ParagraphStyle(
        "small",
        fontName="Helvetica",
        fontSize=8.6,
        leading=11.5,
        textColor=SOFT,
    )

    draw_paragraph(pdf, "Meet your group where they are", left_x, top - 14, left_w, heading_style)
    y = top - 62
    formats = [
        ("Single talk", "An approachable introduction with time for questions."),
        ("Hands-on workshop", "Guided practice with prompts and everyday tasks."),
        ("Multi-week course", "A paced learning path with time to build confidence."),
        ("Guest session", "A focused visit within an existing class or program."),
    ]
    for title, description in formats:
        pdf.setFillColor(BLUE_PALE)
        pdf.roundRect(left_x, y - 43, left_w, 39, 8, fill=1, stroke=0)
        pdf.setFillColor(NAVY)
        pdf.setFont("Helvetica-Bold", 9.5)
        pdf.drawString(left_x + 11, y - 17, title)
        draw_paragraph(pdf, description, left_x + 11, y - 22, left_w - 22, small_style)
        y -= 48

    draw_label(pdf, "What participants gain", right_x, top)
    draw_paragraph(pdf, "Useful skills for everyday life", right_x, top - 14, right_w, heading_style)
    y = top - 64
    for text in [
        "A clear explanation of what AI is and where it can help",
        "Practice asking ChatGPT, Claude, and similar tools useful questions",
        "Simple habits for protecting private and financial information",
        "How to spot scams, false AI answers, and misinformation",
        "Confidence to keep learning after the session ends",
    ]:
        item_height = draw_check_item(pdf, text, right_x, y, right_w)
        y -= max(34, item_height + 12)

    box_y = 156
    pdf.setFillColor(NAVY)
    pdf.roundRect(38, box_y, width - 76, 143, 16, fill=1, stroke=0)
    pdf.setFillColor(MINT)
    pdf.setFont("Helvetica-Bold", 8.5)
    pdf.drawString(56, box_y + 119, "FOR COMMUNITY AND LEARNING LEADERS")
    white_heading = ParagraphStyle(
        "white_heading",
        fontName="Helvetica-Bold",
        fontSize=16,
        leading=19,
        textColor=white,
    )
    white_body = ParagraphStyle(
        "white_body",
        fontName="Helvetica",
        fontSize=9.5,
        leading=13,
        textColor=HexColor("#e4e9f2"),
    )
    draw_paragraph(pdf, "Simple to host, easy to shape for your community", 56, box_y + 106, 500, white_heading)
    draw_paragraph(
        pdf,
        "In-person sessions are preferred, with video available when needed. Most engagements are free. When travel is required, a modest minimum may apply only to cover expenses.",
        56,
        box_y + 82,
        500,
        white_body,
    )
    pdf.setFillColor(MINT)
    pdf.setFont("Helvetica-Bold", 9.2)
    pdf.drawString(56, box_y + 37, "Helpful to have:")
    pdf.setFillColor(white)
    pdf.setFont("Helvetica", 9.2)
    pdf.drawString(132, box_y + 37, "a room, display, internet connection, and an estimated group size")

    pdf.setFillColor(ORANGE)
    pdf.roundRect(38, 79, width - 76, 66, 15, fill=1, stroke=0)
    pdf.setFillColor(white)
    pdf.setFont("Helvetica-Bold", 14.5)
    pdf.drawString(56, 118, "Let's plan a session for your community")
    pdf.setFont("Helvetica", 10)
    pdf.drawString(56, 96, "spirantix.ai/contact.html?type=speaking")
    contact = "hello@spirantix.ai"
    contact_width = stringWidth(contact, "Helvetica-Bold", 10)
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(width - 56 - contact_width, 96, contact)

    pdf.setFillColor(SOFT)
    pdf.setFont("Helvetica", 7.8)
    pdf.drawString(48, 49, "Spirantix helps seniors understand AI, use it with confidence, and protect what matters.")
    footer = "A division of FutureInSites"
    pdf.drawString(width - 48 - stringWidth(footer, "Helvetica", 7.8), 49, footer)

    pdf.showPage()
    pdf.save()
    print(OUTPUT)


if __name__ == "__main__":
    build_pdf()
