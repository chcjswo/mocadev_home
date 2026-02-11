import type { Metadata } from 'next';
import { PageSEO } from '@/components/seo';
import { pageDefaults, seoConfig } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'モカデブ 個人情報処理方針',
  description:
    'モカデブが提供する밥정너、フォーチュンクッキー、점심 뭐 먹지アプリに適用される個人情報処理方針です。',
  keywords: 'モカデブ 個人情報処理方針、個人情報保護、利用規約',
  openGraph: {
    title: 'モカデブ 個人情報処理方針',
    description:
      'モカデブが提供する밥정너、フォーチュンクッキー、점심 뭐 먹지アプリに適用される個人情報処理方針です。',
    url: `${seoConfig.siteUrl}/privacy/ja`,
    siteName: seoConfig.siteName,
    images: [
      {
        url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
        width: 1200,
        height: 630,
        alt: 'モカデブ 個人情報処理方針',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'モカデブ 個人情報処理方針',
    description:
      'モカデブが提供する밥정너、フォーチュンクッキー、점심 뭐 먹지アプリに適用される個人情報処理方針です。',
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/privacy/ja`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPageJA() {
  return (
    <>
      <PageSEO
        title="モカデブ 個人情報処理方針"
        description="モカデブが提供する밥정너、フォーチュンクッキー、점심 뭐 먹지アプリに適用される個人情報処理方針です。"
        keywords="モカデブ 個人情報処理方針、個人情報保護、利用規約"
        canonical="/privacy/ja"
      />
      <div className="bg-white">
        <section className="border-b border-black/5 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <p className="text-sm font-semibold text-gray-500">Privacy Policy</p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">個人情報処理方針</h1>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-16 text-sm text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900">第1条（目的）</h2>
            <p className="mt-4 leading-relaxed">
              モカデブ（以下「会社」という）は、会社が提供するサービス（以下「会社サービス」という）を利用する個人（以下「利用者」または「個人」という）の情報（以下「個人情報」という）を保護するため、個人情報保護法、情報通信網利用促進及び情報保護等に関する法律（以下「情報通信網法」という）等関連法令を遵守し、サービス利用者の個人情報保護に関する苦情を迅速かつ円滑に処理できるようにするため、以下のように個人情報処理方針（以下「本方針」という）を定めます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第2条（個人情報処理の原則）</h2>
            <p className="mt-4 leading-relaxed">
              個人情報に関する法令及び本方針に従い、会社は利用者の個人情報を収集することができ、収集された個人情報は個人の同意がある場合に限り第三者に提供されることがあります。ただし、法令の規定等により適法に強制される場合、会社は収集した利用者の個人情報を事前に個人の同意なく第三者に提供することもできます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第3条（本方針の公開）</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                会社は、利用者がいつでも容易に本方針を確認できるように、会社ホームページの最初の画面または最初の画面との接続画面を通じて本方針を公開しています。
              </li>
              <li>
                会社は、第1項に従い本方針を公開する場合、文字サイズ、色などを活用して利用者が本方針を容易に確認できるようにします。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第4条（本方針の変更）</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                本方針は、個人情報に関する法令、指針、告示または政府や会社サービスの政策や内容の変更に従い改正されることがあります。
              </li>
              <li>
                会社は、第1項に従い本方針を改正する場合、以下の各号のいずれか一以上の方法で通知します。
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>
                    会社が運営するインターネットホームページの最初の画面の通知欄または別のウィンドウを通じて通知する方法
                  </li>
                  <li>書面・ファクス送信・電子メールまたはこれと類似の方法で利用者に通知する方法</li>
                </ol>
              </li>
              <li>
                会社は、第2項の通知は本方針改正の施行日から少なくとも7日前に通知します。ただし、利用者権利の重要な変更がある場合は、少なくとも30日前に通知します。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第5条（個人情報収集方法）</h2>
            <p className="mt-4 leading-relaxed">
              会社は、以下のような方法で利用者の個人情報を収集します。
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>利用者が会社のホームページに自分の個人情報を入力する方式</li>
              <li>
                アプリケーション等、会社が提供するホームページ以外のサービスを通じて利用者が自分の個人情報を入力する方式
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第6条（個人情報の利用）</h2>
            <p className="mt-4 leading-relaxed">
              会社は、個人情報を以下の各号の場合に利用します。
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>通知事項の伝達等、会社運営に必要な場合</li>
              <li>利用問い合わせへの返信、苦情の処理等、利用者に対するサービス改善のための場合</li>
              <li>会社のサービスを提供するための場合</li>
              <li>
                法令及び会社約款に違反する会員に対する利用制限措置、不正利用行為を含むサービスの円滑な運営に支障を与える行為に対する防止及び制裁のための場合
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第7条（個人情報の保有及び利用期間）</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                会社は、利用者の個人情報について、個人情報の収集・利用目的達成のための期間中、個人情報を保有及び利用します。
              </li>
              <li>
                前項にもかかわらず、会社は内部方針によりサービス不正利用記録は不正登録及び利用防止のため、会員退会時点から最大1年間保管します。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              第8条（法令に基づく個人情報の保有及び利用期間）
            </h2>
            <p className="mt-4 leading-relaxed">
              会社は、関係法令に従い、以下のように個人情報を保有及び利用します。
            </p>
            <ol className="mt-4 list-decimal space-y-4 pl-5 leading-relaxed">
              <li>
                電子商取引等における消費者保護に関する法律に基づく保有情報及び保有期間
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>契約または申し込み撤回等に関する記録：5年</li>
                  <li>代金決済及び物品等の供給に関する記録：5年</li>
                  <li>消費者の苦情または紛争処理に関する記録：3年</li>
                  <li>表示・広告に関する記録：6ヶ月</li>
                </ol>
              </li>
              <li>
                通信秘密保護法に基づく保有情報及び保有期間
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>ウェブサイトログ記録資料：3ヶ月</li>
                </ol>
              </li>
              <li>
                電子金融取引法に基づく保有情報及び保有期間
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>電子金融取引に関する記録：5年</li>
                </ol>
              </li>
              <li>
                位置情報の保護及び利用等に関する法律
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>個人位置情報に関する記録：6ヶ月</li>
                </ol>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第9条（個人情報の破棄原則）</h2>
            <p className="mt-4 leading-relaxed">
              会社は、原則として利用者の個人情報処理目的の達成、保有・利用期間の経過等、個人情報が不要になった場合には、該当情報を遅滞なく破棄します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第10条（個人情報破棄手順）</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                利用者が会員登録等のために入力した情報は、個人情報処理目的が達成された後、別のデータベースに移され（紙の場合は別の書類箱）、内部方針及びその他関連法令による情報保護事由に従い（保有及び利用期間参照）一定期間保存された後、破棄されます。
              </li>
              <li>
                会社は、破棄事由が発生した個人情報を個人情報保護責任者の承認手順を経て破棄します。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第11条（個人情報破棄方法）</h2>
            <p className="mt-4 leading-relaxed">
              会社は、電子ファイル形式で保存された個人情報は記録を再生できない技術的方法を使用して削除し、紙で出力された個人情報はシュレッダーで粉砕または焼却などを通じて破棄します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              第12条（個人情報自動収集装置の設置・運営及び拒否に関する事項）
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                会社は、利用者に個別的なカスタマイズサービスを提供するため、利用情報を保存し、随時読み込む個人情報自動収集装置（以下「クッキー」という）を使用します。クッキーは、ウェブサイトを運営するために利用されるサーバー（http）が利用者のウェブブラウザー（PC及びモバイルを含む）に送る少量の情報であり、利用者の保存スペースに保存されることもあります。
              </li>
              <li>
                利用者は、クッキー設置に対する選択権を持っています。したがって、利用者はウェブブラウザーでオプションを設定することにより、すべてのクッキーを許可するか、クッキーが保存されるたびに確認を行うか、またはすべてのクッキーの保存を拒否することもできます。
              </li>
              <li>
                ただし、クッキーの保存を拒否する場合、ログインが必要な会社の一部サービスは利用に困難がある場合があります。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">第13条（クッキー設置許可指定方法）</h2>
            <p className="mt-4 leading-relaxed">
              ウェブブラウザーオプション設定を通じて、クッキー許可、クッキー遮断等の設定を行うことができます。
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                Edge：ウェブブラウザー右上の設定メニュー &gt; クッキー及びサイト権限 &gt; クッキー及びサイトデータ管理及び削除
              </li>
              <li>
                Chrome：ウェブブラウザー右上の設定メニュー &gt; プライバシー及びセキュリティ &gt; クッキー及びその他サイトデータ
              </li>
              <li>
                Whale：ウェブブラウザー右上の設定メニュー &gt; プライバシー保護 &gt; クッキー及びその他サイトデータ
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              第14条（会社の個人情報保護責任者指定）
            </h2>
            <p className="mt-4 leading-relaxed">
              会社は、利用者の個人情報を保護し、個人情報に関連する苦情を処理するため、以下のように関連部門及び個人情報保護責任者を指定しています。
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-semibold text-gray-900">イ. 個人情報保護責任者</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>氏名：全民哲</li>
                <li>職位：代表</li>
                <li>メール：mocadev.tony@gmail.com</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">附則</h2>
            <p className="mt-4 leading-relaxed">第1条 本方針は2025年11月10日から施行されます。</p>
          </section>
        </div>
      </div>
    </>
  );
}
