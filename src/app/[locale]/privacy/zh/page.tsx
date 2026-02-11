import type { Metadata } from 'next';
import { PageSEO } from '@/components/seo';
import { pageDefaults, seoConfig } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'MokaDev 个人信息处理方针',
  description:
    '适用于MokaDev提供的밥정너、Fortune Cookie、점심 뭐 먹지应用程序的个人信息处理方针。',
  keywords: 'MokaDev 个人信息处理方针、个人信息保护、条款',
  openGraph: {
    title: 'MokaDev 个人信息处理方针',
    description:
      '适用于MokaDev提供的밥정너、Fortune Cookie、점심 뭐 먹지应用程序的个人信息处理方针。',
    url: `${seoConfig.siteUrl}/privacy/zh`,
    siteName: seoConfig.siteName,
    images: [
      {
        url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
        width: 1200,
        height: 630,
        alt: 'MokaDev 个人信息处理方针',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'MokaDev 个人信息处理方针',
    description:
      '适用于MokaDev提供的밥정너、Fortune Cookie、점심 뭐 먹지应用程序的个人信息处理方针。',
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/privacy/zh`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPageZH() {
  return (
    <>
      <PageSEO
        title="MokaDev 个人信息处理方针"
        description="适用于MokaDev提供的밥정너、Fortune Cookie、점심 뭐 먹지应用程序的个人信息处理方针。"
        keywords="MokaDev 个人信息处理方针、个人信息保护、条款"
        canonical="/privacy/zh"
      />
      <div className="bg-white">
        <section className="border-b border-black/5 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <p className="text-sm font-semibold text-gray-500">Privacy Policy</p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">个人信息处理方针</h1>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-16 text-sm text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900">第1条（目的）</h2>
            <p className="mt-4 leading-relaxed">
              MokaDev（以下称&lsquo;公司&rsquo;）为保护使用公司提供的服务（以下称&lsquo;公司服务&rsquo;）的个人（以下称&lsquo;用户&rsquo;或&lsquo;个人&rsquo;）的信息（以下称&lsquo;个人信息&rsquo;），遵守个人信息保护法、信息通信网利用促进及信息保护等相关法律（以下称&lsquo;信息通信网法&rsquo;）等相关法令，并为了能够迅速、顺利地处理服务用户的个人信息保护相关投诉，特制定本个人信息处理方针（以下称&lsquo;本方针&rsquo;）。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第2条（个人信息处理原则）</h2>
            <p className="mt-4 leading-relaxed">
              根据个人信息相关法令及本方针，公司可以收集用户的个人信息，收集的个人信息仅在个人同意的情况下可向第三方提供。但是，在法律规定的合法强制情况下，公司可以在未事先获得个人同意的情况下向第三方提供收集的用户个人信息。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第3条（本方针的公开）</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                公司通过公司主页首页或与首页连接的画面公开本方针，以便用户随时可以轻松确认本方针。
              </li>
              <li>
                公司根据第1项公开本方针时，使用字体大小、颜色等，以便用户能够轻松确认本方针。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第4条（本方针的变更）</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                本方针可根据个人信息相关法令、指南、告示或政府及公司服务的政策或内容的变更而修订。
              </li>
              <li>
                公司根据第1项修订本方针时，通过以下各项中的一种或多种方法进行通知。
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>
                    通过公司运营的互联网主页首页的通知栏或单独的窗口进行通知的方法
                  </li>
                  <li>通过书面、传真、电子邮件或类似方法向用户通知的方法</li>
                </ol>
              </li>
              <li>
                公司第2项的通知在本方针修订实施日之前至少7天进行通知。但是，用户权利发生重要变更时，至少提前30天进行通知。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第5条（个人信息收集方法）</h2>
            <p className="mt-4 leading-relaxed">
              公司通过以下方法收集用户的个人信息。
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>用户在公司主页上输入自己个人信息的方式</li>
              <li>
                通过应用程序等公司提供的主页以外的服务，用户输入自己个人信息的方式
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第6条（个人信息的利用）</h2>
            <p className="mt-4 leading-relaxed">
              公司在以下各项情况下利用个人信息。
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>通知事项的传达等公司运营所需的情况</li>
              <li>对用户咨询的回复、投诉处理等为用户服务改善所需的情况</li>
              <li>提供公司服务所需的情况</li>
              <li>
                为防止和制裁违反法令及公司条款的会员的利用限制措施、包括不正当利用行为在内的妨碍服务顺利运营的行为所需的情况
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第7条（个人信息的保有及利用期间）</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                公司对用户的个人信息，在个人信息收集·利用目的达成所需的期间内保有及利用个人信息。
              </li>
              <li>
                尽管有前项规定，公司根据内部方针，为防止不正当注册及利用，将服务不正当利用记录自会员退会时点起最多保存1年。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              第8条（根据法令的个人信息保有及利用期间）
            </h2>
            <p className="mt-4 leading-relaxed">
              公司根据相关法令，按以下方式保有及利用个人信息。
            </p>
            <ol className="mt-4 list-decimal space-y-4 pl-5 leading-relaxed">
              <li>
                根据电子交易等消费者保护相关法律的保有信息及保有期间
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>合同或要约撤回等相关记录：5年</li>
                  <li>付款及商品等供应相关记录：5年</li>
                  <li>消费者投诉或纠纷处理相关记录：3年</li>
                  <li>标识·广告相关记录：6个月</li>
                </ol>
              </li>
              <li>
                根据通信秘密保护法的保有信息及保有期间
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>网站日志记录资料：3个月</li>
                </ol>
              </li>
              <li>
                根据电子金融交易法的保有信息及保有期间
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>电子金融交易相关记录：5年</li>
                </ol>
              </li>
              <li>
                位置信息的保护及利用等相关法律
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>个人位置信息相关记录：6个月</li>
                </ol>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第9条（个人信息销毁原则）</h2>
            <p className="mt-4 leading-relaxed">
              公司原则上在个人信息处理目的达成、保有·利用期间经过等个人信息不再需要时，立即销毁该信息。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第10条（个人信息销毁程序）</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                用户为会员注册等而输入的信息，在个人信息处理目的达成后，转移到单独的数据库（纸质情况下为单独的文件箱），根据内部方针及其他相关法令的信息保护事由（参照保有及利用期间）保存一定期间后销毁。
              </li>
              <li>
                公司对发生销毁事由的个人信息，经过个人信息保护负责人的批准程序后销毁。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第11条（个人信息销毁方法）</h2>
            <p className="mt-4 leading-relaxed">
              公司对以电子文件形式保存的个人信息，使用无法再现记录的技术方法进行删除，对纸质打印的个人信息通过碎纸机粉碎或焚烧等方式销毁。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              第12条（个人信息自动收集装置的安装·运营及拒绝相关事项）
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                公司为了向用户提供个性化的服务，使用存储并随时读取利用信息的个人信息自动收集装置（以下称&lsquo;Cookie&rsquo;）。Cookie是运营网站时使用的服务器（http）向用户的网络浏览器（包括PC及移动设备）发送的少量信息，也可能存储在用户的存储空间中。
              </li>
              <li>
                用户对Cookie的安装拥有选择权。因此，用户可以通过在网络浏览器中设置选项，允许所有Cookie，或在Cookie存储时每次进行确认，或拒绝所有Cookie的存储。
              </li>
              <li>
                但是，如果拒绝Cookie的存储，可能需要登录的公司部分服务在使用上可能会有困难。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第13条（Cookie安装许可指定方法）</h2>
            <p className="mt-4 leading-relaxed">
              可以通过网络浏览器选项设置来设置Cookie许可、Cookie阻止等。
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                Edge：网络浏览器右上角的设置菜单 &gt; Cookie及网站权限 &gt; Cookie及网站数据管理和删除
              </li>
              <li>
                Chrome：网络浏览器右上角的设置菜单 &gt; 隐私和安全 &gt; Cookie及其他网站数据
              </li>
              <li>
                Whale：网络浏览器右上角的设置菜单 &gt; 隐私保护 &gt; Cookie及其他网站数据
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              第14条（公司个人信息保护负责人指定）
            </h2>
            <p className="mt-4 leading-relaxed">
              公司为保护用户的个人信息并处理与个人信息相关的投诉，指定相关部门及个人信息保护负责人如下。
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-semibold text-gray-900">甲. 个人信息保护负责人</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>姓名：全民哲</li>
                <li>职位：代表</li>
                <li>电子邮件：mocadev.tony@gmail.com</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">附则</h2>
            <p className="mt-4 leading-relaxed">第1条 本方针自2025年11月10日起施行。</p>
          </section>
        </div>
      </div>
    </>
  );
}
