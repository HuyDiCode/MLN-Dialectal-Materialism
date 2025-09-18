import React, { useEffect, useRef, useState } from "react";
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !timelineRef.current)
      return;

    // Mouse tracking for magnetic effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Enhanced header animation with 3D effects
    gsap.fromTo(
      headerRef.current.children,
      {
        y: 100,
        opacity: 0,
        rotationX: 45,
        transformPerspective: 1000,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Enhanced timeline items animations with 3D effects
    const timelineItems =
      timelineRef.current.querySelectorAll(".timeline-item");

    timelineItems.forEach((item, itemIndex) => {
      const cards = item.querySelectorAll(".timeline-card");

      // Enhanced stagger animation with 3D transforms
      cards.forEach((card, cardIndex) => {
        gsap.fromTo(
          card,
          {
            y: 150,
            opacity: 0,
            scale: 0.7,
            rotationY: cardIndex % 2 === 0 ? -45 : 45,
            transformPerspective: 1000,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            delay: cardIndex * 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        // Enhanced slide away effect with rotation
        gsap.fromTo(
          card,
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
          },
          {
            x: cardIndex % 2 === 0 ? -150 : 150,
            opacity: 0.2,
            scale: 0.9,
            rotationY: cardIndex % 2 === 0 ? -25 : 25,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: item,
              start: "bottom 70%",
              end: "bottom 5%",
              scrub: 2,
              toggleActions: "play none none reverse",
            },
          }
        );

        // Floating animation for cards
        gsap.to(card, {
          y: -10,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: itemIndex * 0.5 + cardIndex * 0.3,
        });
      });

      // Enhanced timeline dot animation with pulsing effect
      const dot = item.querySelector(".timeline-dot");
      if (dot) {
        gsap.fromTo(
          dot,
          {
            scale: 0,
            rotation: 180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        // Continuous pulsing animation
        gsap.to(dot, {
          scale: 1.2,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: itemIndex * 0.3,
        });

        // Glow effect
        gsap.to(dot, {
          boxShadow:
            "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: itemIndex * 0.2,
        });
      }
    });

    // Enhanced timeline line animation with gradient effect
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

      // Animated gradient effect on timeline
      gsap.to(timelineLine, {
        backgroundPosition: "0% 100%",
        duration: 3,
        repeat: -1,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id='timeline-section'
      className='relative w-full bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden'
    >
      {/* Dynamic Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse'
          style={{
            background: "linear-gradient(45deg, #9333ea, #3b82f6)",
            top: "10%",
            left: "5%",
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>
        <div
          className='absolute w-72 h-72 rounded-full blur-3xl opacity-8 animate-pulse'
          style={{
            background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
            top: "60%",
            right: "5%",
            transform: `translate(${-mousePosition.x * 0.015}px, ${
              -mousePosition.y * 0.015
            }px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: "2s",
          }}
        ></div>
      </div>

      {/* Section Header */}
      <div ref={headerRef} className='relative py-20 text-center'>
        <div className='relative'>
          <h2 className='text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 custom-font relative'>
            <span className='inline-block hover:scale-105 transition-transform duration-300'>
              Hành trình của một
            </span>
            <span className='block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-400 hover:via-pink-500 hover:to-indigo-500 transition-all duration-500'>
              sinh viên
            </span>

            {/* Decorative elements */}
            <div className='absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 animate-bounce'></div>
            <div className='absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-40 animate-pulse delay-1000'></div>
          </h2>

          <p className='text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed'>
            <span className='font-semibold text-purple-700'>
              Trong giai đoạn chuyển tiếp
            </span>
            <span className='block mt-2'>
              Từ băng ghế nhà trường đến thế giới việc làm
            </span>
          </p>

          {/* Animated underline */}
          <div className='mt-8 flex justify-center'>
            <div className='w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse'></div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className='relative max-w-7xl mx-auto px-4 pb-64'>
        {/* Enhanced Timeline Line with gradient */}
        <div
          className='timeline-line absolute left-1/2 transform -translate-x-1/2 w-2 h-full origin-top rounded-full'
          style={{
            background:
              "linear-gradient(180deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
            backgroundSize: "100% 200%",
            animation: "gradient-shift 4s ease-in-out infinite",
          }}
        ></div>

        {timelineData.map((item, index) => (
          <div key={item.id} className='timeline-item relative mb-40'>
            {/* Enhanced Timeline Dot */}
            <div
              className='timeline-dot absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-2xl z-20 cursor-pointer transition-all duration-300 hover:scale-125'
              style={{
                background: `linear-gradient(45deg, 
                  ${
                    index % 3 === 0
                      ? "#3b82f6"
                      : index % 3 === 1
                      ? "#8b5cf6"
                      : "#ec4899"
                  }, 
                  ${
                    index % 3 === 0
                      ? "#1d4ed8"
                      : index % 3 === 1
                      ? "#7c3aed"
                      : "#db2777"
                  })`,
                boxShadow: `0 0 20px ${
                  index % 3 === 0
                    ? "rgba(59, 130, 246, 0.5)"
                    : index % 3 === 1
                    ? "rgba(139, 92, 246, 0.5)"
                    : "rgba(236, 72, 153, 0.5)"
                }`,
              }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            ></div>

            {/* Content Container */}
            <div
              className={`flex items-start ${
                item.isLeft ? "flex-row-reverse" : "flex-row"
              } gap-12`}
            >
              {/* Image/Icon Side */}
              <div className='w-1/2 flex justify-center'>
                <div
                  className={`timeline-card group bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-10 border-2 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                    hoveredCard === item.id
                      ? "border-purple-400 shadow-purple-200"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  style={{
                    backdropFilter: "blur(10px)",
                    background:
                      hoveredCard === item.id
                        ? "linear-gradient(135deg, rgba(147, 51, 234, 0.05), rgba(79, 70, 229, 0.05))"
                        : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(249, 250, 251, 0.9))",
                  }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className='text-8xl mb-6 text-center group-hover:scale-110 transition-transform duration-300'>
                    {item.image}
                  </div>
                  <div className='relative'>
                    <h3 className='text-3xl font-bold text-gray-900 text-center mb-3 group-hover:text-purple-700 transition-colors duration-300'>
                      Mốc {item.id}
                    </h3>
                    <h4 className='text-xl font-semibold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                      {item.title}
                    </h4>

                    {/* Floating particles around icon */}
                    {hoveredCard === item.id && (
                      <div className='absolute inset-0 pointer-events-none'>
                        <div className='absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full animate-ping'></div>
                        <div className='absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-300'></div>
                        <div className='absolute top-6 left-2 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-500'></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className='w-1/2 space-y-8'>
                {/* Main Description Card */}
                <div
                  className={`timeline-card group bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-8 border-2 transition-all duration-500 transform hover:scale-102 hover:-translate-y-1 ${
                    hoveredCard === item.id
                      ? "border-blue-400 shadow-blue-200"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className='relative'>
                    <div className='absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60 group-hover:animate-spin'></div>

                    {item.description.map((desc, idx) => (
                      <div
                        key={idx}
                        className='flex items-start mb-4 group-hover:translate-x-1 transition-transform duration-300'
                        style={{ transitionDelay: `${idx * 100}ms` }}
                      >
                        <span className='text-2xl mr-4 mt-1 group-hover:animate-bounce'>
                          📌
                        </span>
                        <p className='text-gray-700 leading-relaxed text-lg group-hover:text-gray-800 transition-colors duration-300'>
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Analysis Card */}
                <div
                  className={`timeline-card group bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl shadow-xl p-8 border-2 transition-all duration-500 transform hover:scale-102 hover:-translate-y-1 ${
                    hoveredCard === item.id
                      ? "border-purple-400 shadow-purple-200"
                      : "border-purple-200 hover:border-purple-300"
                  }`}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className='relative'>
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 group-hover:animate-pulse'></div>

                    <div className='flex items-start mb-4 group-hover:translate-x-1 transition-transform duration-300'>
                      <span className='text-2xl mr-4 mt-1 group-hover:animate-bounce'>
                        🔎
                      </span>
                      <h5 className='font-bold text-xl text-purple-800 group-hover:text-purple-900 transition-colors duration-300'>
                        Phạm trù: {item.category}
                      </h5>
                    </div>
                    <div className='flex items-start group-hover:translate-x-1 transition-transform duration-300 delay-100'>
                      <span className='text-2xl mr-4 mt-1 group-hover:animate-bounce delay-200'>
                        👉
                      </span>
                      <p className='text-purple-700 leading-relaxed text-lg group-hover:text-purple-800 transition-colors duration-300'>
                        {item.categoryDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Enhanced Conclusion Section */}
        <div className='relative mt-32'>
          <div
            className='timeline-dot absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white shadow-2xl z-20'
            style={{
              background: "linear-gradient(45deg, #10b981, #059669)",
              boxShadow:
                "0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.3)",
            }}
          ></div>

          <div className='group bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl shadow-2xl p-12 border-2 border-green-200 mx-8 hover:border-green-300 transition-all duration-500 transform hover:scale-102 hover:-translate-y-2'>
            <div className='text-center mb-10'>
              <div className='inline-block p-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 group-hover:animate-pulse'>
                <span className='text-4xl'>🎯</span>
              </div>
              <h3 className='text-4xl md:text-5xl font-bold text-green-800 mb-4 group-hover:text-green-900 transition-colors duration-300'>
                Bài học rút ra
              </h3>
              <div className='w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto'></div>
            </div>

            <div className='space-y-6 max-w-5xl mx-auto'>
              <div className='group/item bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:border-green-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4 group-hover/item:animate-spin'>
                    <span className='text-white text-sm font-bold'>1</span>
                  </div>
                  <p className='text-gray-800 font-semibold text-lg leading-relaxed group-hover/item:text-green-800 transition-colors duration-300'>
                    Mạng xã hội là cơ hội nhưng cũng là áp lực - cần biết cân
                    bằng và sử dụng một cách thông minh.
                  </p>
                </div>
              </div>

              <div className='group/item bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:border-green-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-4 group-hover/item:animate-spin'>
                    <span className='text-white text-sm font-bold'>2</span>
                  </div>
                  <p className='text-gray-800 font-semibold text-lg leading-relaxed group-hover/item:text-emerald-800 transition-colors duration-300'>
                    Nếu chỉ chạy theo hiện tượng (trend, view, like) thì sẽ đánh
                    mất giá trị thật và mục tiêu ban đầu.
                  </p>
                </div>
              </div>

              <div className='group/item bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:border-green-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0 w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mr-4 group-hover/item:animate-spin'>
                    <span className='text-white text-sm font-bold'>3</span>
                  </div>
                  <p className='text-gray-800 font-semibold text-lg leading-relaxed group-hover/item:text-teal-800 transition-colors duration-300'>
                    Sinh viên cần nhận thức đúng: mạng xã hội chỉ là công cụ,
                    bản chất của việc tìm việc và xây dựng thương hiệu cá nhân
                    vẫn là năng lực thực sự.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className='absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-60 animate-bounce'></div>
            <div className='absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-40 animate-pulse delay-1000'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
