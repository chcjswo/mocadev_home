import Image from 'next/image';
import { PageSEO } from '@/components/seo';
import { pageDefaults } from '@/lib/seo/config';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const teamMembers = [
  {
    name: '동대문사단',
    roles: ['개발', '기획'],
    image: '/images/profile/myimage.jpg',
    description: '앱의 핵심 기능을 개발하고 서비스 기획을 담당합니다.',
  },
  {
    name: '맹꽁이',
    roles: ['기획', '디자인', '홍보'],
    image: '/images/profile/maengkkongi.svg',
    description: '사용자 경험을 고려한 기획과 디자인, 그리고 서비스 홍보를 맡고 있습니다.',
  },
];

export default function TeamPage() {
  return (
    <>
      <PageSEO
        title={pageDefaults.team.title}
        description={pageDefaults.team.description}
        keywords={pageDefaults.team.keywords}
        ogImage="/images/og/home.svg"
      />

      <div className="bg-gradient-to-br from-[#f5f3ff] via-white to-[#e0f2fe]">
        <section className="border-b border-black/5">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                MokaDev Team
              </p>
              <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">만든 사람들</h1>
              <p className="mt-6 text-lg text-gray-700">
                작은 문제를 발견하고 앱으로 해결하는 모카데브 팀을 소개합니다.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {teamMembers.map((member) => (
                <Card key={member.name} className="border-black/5 bg-white shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-gray-100 shadow-md">
                        {member.image.endsWith('.svg') ? (
                          <Image
                            src={member.image}
                            alt={`${member.name} 프로필`}
                            width={128}
                            height={128}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Image
                            src={member.image}
                            alt={`${member.name} 프로필`}
                            width={128}
                            height={128}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                      <div className="mt-3 flex flex-wrap justify-center gap-2">
                        {member.roles.map((role) => (
                          <Badge
                            key={role}
                            variant="secondary"
                            className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-gray-600">{member.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

