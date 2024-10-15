export function sendNewsletterEmail(
  name: string,
  subject: string,
  message: string
) {
  const link = process.env.NEXT_PUBLIC_BASE_URL;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background-color: #0070f3; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { background-color: #f8f8f8; padding: 20px; text-align: center; }
            img { max-width: 100%; height: auto; }
            .button { background-color: #0070f3; color: #ffffff; padding: 10px 20px; text-decoration: none; display: inline-block; }
            @media only screen and (max-width: 600px) {
                .container { width: 100% !important; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="color: #ffffff; margin: 0;">JOHN'S COMMENT</h1>
            </div>
            <div class="content">
                <h2 style="color: #333333;">${name}</h2>
                <p style="color: #666666;">${subject}</p>
                <div style="margin-bottom: 20px;">
                    ${message}
                </div>
            </div>
            <div class="footer">
                <p style="margin: 0; color: #666666; font-size: 14px;">Thank you for contacting me</p>
                <p style="margin: 10px 0 0; color: #666666; font-size: 12px;">&copy; 2023 Your <a href=${link}>John's Portfolio<a/>. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}
