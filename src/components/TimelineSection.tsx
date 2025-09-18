import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../hooks/useGSAP";

interface TimelineItem {
  id: number;
  title: string;
  description: string[];
  category: string;
  categoryDescription: string;
  image: string;
  isLeft: boolean;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Năm cuối đại học",
    description: [
      "Nhân vật đang hoàn thành những môn cuối cùng, hồ sơ còn mỏng, chưa có nhiều kinh nghiệm.",
      "Dự định sẽ lập tài khoản TikTok để chia sẻ hành trình học tập.",
    ],
    category: "Cái riêng - Cái chung",
    categoryDescription:
      "Nhân vật chỉ là một trường hợp riêng, nhưng phản ánh tình trạng chung: nhiều sinh viên thiếu kinh nghiệm thực tế, chọn mạng xã hội như công cụ để 'bù đắp'.",
    image: "📚",
    isLeft: true,
  },
  {
    id: 2,
    title: "Tốt nghiệp",
    description: [
      "Bắt đầu chuẩn bị CV, tìm việc qua LinkedIn, Facebook.",
      "Thử đăng video, chia sẻ trải nghiệm nhưng ít ai quan tâm.",
    ],
    category: "Hiện tượng - Bản chất",
    categoryDescription:
      "Hiện tượng: ít tương tác khiến nhân vật lo lắng, tự ti. Bản chất: việc tìm việc làm cần năng lực thật, chứ không chỉ 'like' hay 'view' trên mạng.",
    image: "🎓",
    isLeft: false,
  },
  {
    id: 3,
    title: "Sau 3 tháng",
    description: [
      "Đăng bài đều đặn nhưng vẫn ít người xem, nhân vật hoang mang khi thấy bạn bè khác viral.",
      "Vừa nộp CV vừa thất vọng vì kết quả không như mong muốn.",
    ],
    category: "Cái riêng - Cái chung",
    categoryDescription:
      "Nỗi lo cá nhân phản ánh thực trạng chung: sinh viên dễ bị áp lực khi so sánh mình với người khác trên mạng.",
    image: "📱",
    isLeft: true,
  },
  {
    id: 4,
    title: "Sau nửa năm",
    description: [
      "Nhân vật học cách chạy theo trend để tăng view.",
      "Bài viết bắt đầu viral, nhưng nội dung kiến thức ngày càng ít.",
    ],
    category: "Lượng - Chất",
    categoryDescription:
      "Lượng view tăng dần → dẫn đến thay đổi về chất: nhân vật tập trung vào 'trend' hơn là kiến thức thật. Hệ quả: dần xa rời mục tiêu ban đầu là thể hiện năng lực.",
    image: "📈",
    isLeft: false,
  },
  {
    id: 5,
    title: "Sau gần 1 năm",
    description: [
      "Có nhiều bài viết viral, một số công ty chú ý và liên hệ.",
      "Nhân vật điều chỉnh: vừa chạy trend, vừa chia sẻ kiến thức thực sự, xây dựng năng lực thật.",
    ],
    category: "Hiện tượng - Bản chất",
    categoryDescription:
      "Khi nhận ra bản chất (năng lực + tri thức) mới là cốt lõi, nhân vật dung hòa mạng xã hội như một công cụ bổ trợ → cuối cùng tìm được việc làm ổn định.",
    image: "💼",
    isLeft: true,
  },
];

const TimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !timelineRef.current)
      return;

    // Header animation
    gsap.fromTo(
      headerRef.current.children,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Timeline items animations
    const timelineItems =
      timelineRef.current.querySelectorAll(".timeline-item");

    timelineItems.forEach((item) => {
      const cards = item.querySelectorAll(".timeline-card");

      // Stagger animation for cards within each timeline item
      cards.forEach((card, cardIndex) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: cardIndex * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        // Slide away effect on further scroll with proper reset
        gsap.fromTo(
          card,
          {
            x: 0,
            opacity: 1,
            scale: 1,
          },
          {
            x: cardIndex % 2 === 0 ? -100 : 100,
            opacity: 0.3,
            scale: 0.95,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "bottom 60%",
              end: "bottom 10%",
              scrub: 1,
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Timeline dot animation
      const dot = item.querySelector(".timeline-dot");
      if (dot) {
        gsap.fromTo(
          dot,
          {
            scale: 0,
          },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });

    // Timeline line animation
    const timelineLine = timelineRef.current.querySelector(".timeline-line");
    if (timelineLine) {
      gsap.fromTo(
        timelineLine,
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id='timeline-section'
      className='relative w-full bg-white'
    >
      {/* Section Header */}
      <div ref={headerRef} className='relative py-16 text-center'>
        <h2 className='text-5xl md:text-6xl font-bold text-gray-900 mb-4 custom-font'>
          Hành trình của một sinh viên
        </h2>
        <p className='text-xl text-gray-600 max-w-3xl mx-auto px-4'>
          Trong giai đoạn chuyển tiếp - Từ băng ghế nhà trường đến thế giới việc
          làm
        </p>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className='relative max-w-6xl mx-auto px-4 pb-64'>
        {/* Timeline Line */}
        <div className='timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-300 h-full origin-top'></div>

        {timelineData.map((item) => (
          <div key={item.id} className='timeline-item relative mb-32'>
            {/* Timeline Dot */}
            <div className='timeline-dot absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10'></div>

            {/* Content Container */}
            <div
              className={`flex items-center ${
                item.isLeft ? "flex-row-reverse" : "flex-row"
              } gap-8`}
            >
              {/* Image/Icon Side */}
              <div className='w-1/2 flex justify-center'>
                <div className='timeline-card bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300'>
                  <div className='text-6xl mb-4 text-center'>{item.image}</div>
                  <h3 className='text-2xl font-bold text-gray-900 text-center mb-2'>
                    Mốc {item.id}
                  </h3>
                  <h4 className='text-lg font-semibold text-blue-600 text-center'>
                    {item.title}
                  </h4>
                </div>
              </div>

              {/* Content Side */}
              <div className='w-1/2 space-y-6'>
                {/* Main Description Card */}
                <div className='timeline-card bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300'>
                  <div className='mb-4'>
                    {item.description.map((desc, idx) => (
                      <div key={idx} className='flex items-start mb-3'>
                        <span className='text-blue-500 mr-3 mt-1'>📌</span>
                        <p className='text-gray-700 leading-relaxed'>{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Analysis Card */}
                <div className='timeline-card bg-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200 hover:shadow-xl transition-shadow duration-300'>
                  <div className='flex items-start mb-3'>
                    <span className='text-blue-600 mr-3 mt-1'>🔎</span>
                    <h5 className='font-semibold text-blue-800'>
                      Phạm trù: {item.category}
                    </h5>
                  </div>
                  <div className='flex items-start'>
                    <span className='text-blue-600 mr-3 mt-1'>👉</span>
                    <p className='text-blue-700 leading-relaxed'>
                      {item.categoryDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Conclusion Section */}
        <div className='relative mt-20'>
          <div className='timeline-dot absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg z-10'></div>

          <div className='bg-green-50 rounded-3xl shadow-xl p-8 border-2 border-green-200 mx-8'>
            <div className='text-center mb-6'>
              <h3 className='text-3xl font-bold text-green-800 mb-2'>
                🎯 Bài học rút ra
              </h3>
            </div>

            <div className='space-y-4 max-w-4xl mx-auto'>
              <div className='bg-white rounded-xl p-4 shadow-md'>
                <p className='text-gray-800 font-medium'>
                  Mạng xã hội là cơ hội nhưng cũng là áp lực.
                </p>
              </div>

              <div className='bg-white rounded-xl p-4 shadow-md'>
                <p className='text-gray-800 font-medium'>
                  Nếu chỉ chạy theo hiện tượng (trend, view, like) thì sẽ đánh
                  mất giá trị thật.
                </p>
              </div>

              <div className='bg-white rounded-xl p-4 shadow-md'>
                <p className='text-gray-800 font-medium'>
                  Sinh viên cần nhận thức đúng: mạng xã hội chỉ là công cụ, bản
                  chất của việc tìm việc và xây dựng thương hiệu cá nhân vẫn là
                  năng lực thực.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
