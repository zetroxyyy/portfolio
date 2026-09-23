export interface Testimonial {
  slug: string;
  project: string;
  domain: string;
  lang: 'ja' | 'ne' | 'en'; // BCP-47 for the ORIGINAL quote
  langLabel: string;
  quote: string; // verbatim — never edit
  translation?: string; // omit when the original is English
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    slug: 'dream-adventure',
    project: 'Dream Adventure',
    domain: 'thedreamadventure.com',
    lang: 'ja',
    langLabel: '日本語',
    quote:
      '私たちの旅行会社のウェブサイトを美しく、そして非常に使いやすく構築していただきました。デザインのセンスが素晴らしいだけでなく、モバイル対応や予約機能の動線も完璧で、サイト公開後はお客様からの問い合わせが目に見えて増えました。コミュニケーションもスムーズで、細かな要望にも迅速に対応してれる非常にプロフェッショナルな開発者です。自信を持ってお勧めします。',
    translation:
      'They built a beautiful and highly user-friendly website for our travel agency. Not only is their design sense fantastic, but the mobile responsiveness and booking flow are perfect. Inquiries have visibly increased since the launch. Communication was smooth, and they are a highly professional developer who quickly responded to our detailed requests. I recommend them with confidence.',
    author: 'Representative',
    role: 'The Dream Adventure · Minakami, Gunma, Japan',
  },
  {
    slug: 'nischal-legal',
    project: 'Nischal Legal Service',
    domain: 'nischallegalservice.com',
    lang: 'ne',
    langLabel: 'नेपाली',
    quote:
      'हाम्रो ल फर्मको वेबसाइट निर्माणको लागि उहाँको काम उत्कृष्ट रह्यो। वेबसाइट एकदमै प्रोफेसनल देखिन्छ र यसले हाम्रा कानुनी सेवाहरूलाई सेवाग्राहीमाझ स्पष्ट रूपमा प्रस्तुत गरेको छ। उहाँको काम गर्ने शैली, समयको पालना र प्राविधिक ज्ञानबाट हामी धेरै सन्तुष्ट छौं। हाम्रो आवश्यकतालाई बुझेर सोही अनुसारको छिटो र सुरक्षित वेबसाइट बनाइदिनुभएकोमा धेरै धेरै धन्यवाद!',
    translation:
      "Their work on building our law firm's website was excellent. The website looks very professional and clearly presents our legal services to the clients. We are very satisfied with their working style, punctuality, and technical knowledge. Thank you very much for understanding our needs and creating a fast and secure website accordingly!",
    author: 'Founder / Advocate',
    role: 'Nischal Legal Service · Chitwan, Nepal',
  },
  {
    slug: 'nexus',
    project: 'Nexus',
    domain: 'nexus-mcu.online',
    lang: 'en',
    langLabel: 'English',
    quote:
      'Building the platform for Nexus MCU required a clean UI, fast load times, and seamless navigation, and the final delivery absolutely exceeded our expectations. They took our initial concept and turned it into a highly responsive, modern website that handles our traffic effortlessly. It is rare to find a developer who perfectly balances technical backend skills with such a strong eye for frontend design. Highly recommended for any complex web project.',
    author: 'Project Lead',
    role: 'Nexus MCU',
  },
];
