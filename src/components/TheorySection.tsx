import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../hooks/useGSAP";
import "../assets/animations-3d.css";
import BrainConsciousnessAnimation from "./animations/BrainConsciousnessAnimation";
import SeedGrowthAnimation from "./animations/SeedGrowthAnimation";
import InterconnectionAnimation from "./animations/InterconnectionAnimation";
import WaterPhaseAnimation from "./animations/WaterPhaseAnimation";
import TeamCompetitionAnimation from "./animations/TeamCompetitionAnimation";
import SpiralDevelopmentAnimation from "./animations/SpiralDevelopmentAnimation";
import DevelopmentAnimation from "./animations/DevelopmentAnimation";

const TheorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Header animation
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

    // Tab content animations
    const tabContents = sectionRef.current.querySelectorAll(".tab-content");
    tabContents.forEach((content) => {
      gsap.fromTo(
        content.children,
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: content,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const tabs = [
    {
      id: "overview",
      title: "Tổng quan",
      icon: "🧠",
      color: "purple",
    },
    {
      id: "principles",
      title: "Nguyên tắc",
      icon: "⚖️",
      color: "blue",
    },
    {
      id: "laws",
      title: "Quy luật",
      icon: "🔄",
      color: "indigo",
    },
    {
      id: "categories",
      title: "Phạm trù",
      icon: "🔗",
      color: "pink",
    },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className='tab-content space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='bg-white rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300'>
                <div className='flex items-center mb-4'>
                  <span className='text-2xl mr-3'>🌍</span>
                  <h3 className='text-xl font-bold text-purple-800'>Duy vật</h3>
                </div>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Thế giới được tạo ra từ{" "}
                  <span className='font-semibold text-purple-600'>
                    vật chất
                  </span>
                  . Vật chất sinh ra trước, ý thức được hình thành sau.
                </p>
                <div className='bg-purple-50 rounded-lg p-2 mb-3 perspective-container shadow-3d transform-3d'>
                  <BrainConsciousnessAnimation />
                </div>
                <div className='text-center text-sm text-purple-700 font-medium'>
                  💡 Bộ não (vật chất) → Ý thức (suy nghĩ)
                </div>
              </div>

              <div className='bg-white rounded-2xl p-6 shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300'>
                <div className='flex items-center mb-4'>
                  <span className='text-2xl mr-3'>🔄</span>
                  <h3 className='text-xl font-bold text-blue-800'>
                    Biện chứng
                  </h3>
                </div>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Thế giới như một bức tranh{" "}
                  <span className='font-semibold text-blue-600'>
                    luôn chuyển động
                  </span>
                  , thay đổi và đầy mâu thuẫn.
                </p>
                <div className='bg-blue-50 rounded-lg p-2 mb-3 perspective-container-wide shadow-3d transform-3d'>
                  <SeedGrowthAnimation />
                </div>
                <div className='text-center text-sm text-blue-700 font-medium'>
                  💡 Hạt giống → Cây lớn (qua mâu thuẫn nội tại)
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 border-2 border-purple-200'>
              <h3 className='text-2xl font-bold text-center mb-4 text-gray-800'>
                🎯 Phép biện chứng duy vật
              </h3>
              <p className='text-center text-lg text-gray-700 leading-relaxed'>
                Cách nhìn thế giới theo quan điểm{" "}
                <span className='font-bold text-purple-600'>
                  vật chất luôn vận động, phát triển
                </span>
                theo các quy luật khách quan, không phụ thuộc vào ý muốn con
                người.
              </p>
            </div>
          </div>
        );

      case "principles":
        return (
          <div className='tab-content space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='bg-white rounded-2xl p-6 shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300'>
                <div className='flex items-center mb-4'>
                  <span className='text-2xl mr-3'>🔗</span>
                  <h3 className='text-xl font-bold text-blue-800'>
                    Liên hệ phổ biến
                  </h3>
                </div>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Mọi sự vật đều{" "}
                  <span className='font-semibold text-blue-600'>liên kết</span>{" "}
                  với nhau, không có gì tồn tại cô lập.
                </p>
                <div className='bg-blue-50 rounded-lg p-2 mb-3 perspective-container shadow-3d transform-3d ambient-light'>
                  <InterconnectionAnimation />
                </div>
                <div className='text-center text-sm text-blue-700 font-medium'>
                  💡 Cây cần nước, đất, ánh sáng. Thiếu một yếu tố → cây chết
                </div>
              </div>

              <div className='bg-white rounded-2xl p-6 shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300'>
                <div className='flex items-center mb-4'>
                  <span className='text-2xl mr-3'>📈</span>
                  <h3 className='text-xl font-bold text-green-800'>
                    Sự phát triển
                  </h3>
                </div>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Thế giới{" "}
                  <span className='font-semibold text-green-600'>
                    luôn thay đổi, phát triển
                  </span>
                  có quy luật, không ngẫu nhiên.
                </p>
                <div className='bg-green-50 rounded-lg p-2 mb-3 perspective-container-wide shadow-3d transform-3d'>
                  <DevelopmentAnimation />
                </div>
                <div className='text-center text-sm text-green-700 font-medium'>
                  💡 Trẻ em → người lớn, xã hội nông nghiệp → công nghiệp
                </div>
              </div>
            </div>
          </div>
        );

      case "laws":
        return (
          <div className='tab-content space-y-6'>
            <div className='space-y-4'>
              <div className='bg-white rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300'>
                <div className='flex items-center mb-4'>
                  <span className='text-2xl mr-3'>⚗️</span>
                  <h3 className='text-xl font-bold text-orange-800'>
                    Lượng ↔ Chất
                  </h3>
                </div>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Thay đổi{" "}
                  <span className='font-semibold text-orange-600'>lượng</span>{" "}
                  đến mức nhất định → thay đổi{" "}
                  <span className='font-semibold text-orange-600'>chất</span>
                </p>
                <div className='bg-orange-50 rounded-lg p-2 mb-3 perspective-container shadow-deep transform-3d'>
                  <WaterPhaseAnimation />
                </div>
                <div className='text-center text-sm text-orange-700 font-medium'>
                  💡 Nước sôi 100°C → từ lỏng thành khí
                </div>
              </div>

              <div className='bg-white rounded-2xl p-6 shadow-lg border border-red-200 hover:shadow-xl transition-all duration-300'>
                <div className='flex items-center mb-4'>
                  <span className='text-2xl mr-3'>⚡</span>
                  <h3 className='text-xl font-bold text-red-800'>
                    Thống nhất & Đấu tranh đối lập
                  </h3>
                </div>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Mọi sự vật có{" "}
                  <span className='font-semibold text-red-600'>
                    mâu thuẫn bên trong
                  </span>
                  . Sự đấu tranh thúc đẩy phát triển.
                </p>
                <div className='bg-red-50 rounded-lg p-2 mb-3 perspective-container shadow-3d transform-3d ambient-light'>
                  <TeamCompetitionAnimation />
                </div>
                <div className='text-center text-sm text-red-700 font-medium'>
                  💡 Đội bóng: cạnh tranh vị trí → chiến thuật tốt hơn
                </div>
              </div>

              <div className='bg-white rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300'>
                <div className='flex items-center mb-4'>
                  <span className='text-2xl mr-3'>🌀</span>
                  <h3 className='text-xl font-bold text-purple-800'>
                    Phủ định của phủ định
                  </h3>
                </div>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Phát triển theo{" "}
                  <span className='font-semibold text-purple-600'>xoắn ốc</span>
                  : loại bỏ cái cũ, giữ cái tích cực.
                </p>
                <div className='bg-purple-50 rounded-lg p-2 mb-3 perspective-container-wide shadow-deep transform-3d ambient-light'>
                  <SpiralDevelopmentAnimation />
                </div>
                <div className='text-center text-sm text-purple-700 font-medium'>
                  💡 Hạt giống → cây → quả có hạt mới (cao cấp hơn)
                </div>
              </div>
            </div>
          </div>
        );

      case "categories":
        return (
          <div className='tab-content space-y-6'>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='bg-white rounded-2xl p-5 shadow-lg border border-pink-200 hover:shadow-xl transition-all duration-300'>
                <h4 className='font-bold text-pink-800 mb-2'>
                  🔍 Cái chung - Cái riêng
                </h4>
                <p className='text-sm text-gray-700'>
                  Riêng: mỗi cây cụ thể | Chung: đều cần nước, ánh sáng
                </p>
              </div>

              <div className='bg-white rounded-2xl p-5 shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300'>
                <h4 className='font-bold text-blue-800 mb-2'>
                  ➡️ Nguyên nhân - Kết quả
                </h4>
                <p className='text-sm text-gray-700'>
                  Học chăm → thi đỗ → tự tin → học tốt hơn
                </p>
              </div>

              <div className='bg-white rounded-2xl p-5 shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300'>
                <h4 className='font-bold text-green-800 mb-2'>
                  🎯 Tất nhiên - Ngẫu nhiên
                </h4>
                <p className='text-sm text-gray-700'>
                  Tất nhiên: mặt trời mọc | Ngẫu nhiên: gặp bạn cũ
                </p>
              </div>

              <div className='bg-white rounded-2xl p-5 shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300'>
                <h4 className='font-bold text-purple-800 mb-2'>
                  📝 Nội dung - Hình thức
                </h4>
                <p className='text-sm text-gray-700'>
                  Nội dung: thông điệp | Hình thức: cách trình bày
                </p>
              </div>

              <div className='bg-white rounded-2xl p-5 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300'>
                <h4 className='font-bold text-orange-800 mb-2'>
                  💎 Bản chất - Hiện tượng
                </h4>
                <p className='text-sm text-gray-700'>
                  Bản chất: cốt lõi sâu xa | Hiện tượng: biểu hiện bên ngoài
                </p>
              </div>
            </div>

            <div className='bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200'>
              <h4 className='text-lg font-bold text-center mb-3 text-gray-800'>
                🎭 Phạm trù giúp phân tích mối quan hệ
              </h4>
              <p className='text-center text-gray-700'>
                Những khái niệm cơ bản nhất để hiểu các khía cạnh của sự vật,
                hiện tượng
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={sectionRef}
      id='theory-section'
      className='relative w-full bg-gradient-to-br from-white via-purple-50 to-blue-50 py-20'
    >
      {/* Dynamic Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute w-80 h-80 rounded-full blur-3xl opacity-10 animate-pulse'
          style={{
            background: "linear-gradient(45deg, #8b5cf6, #3b82f6)",
            top: "20%",
            left: "10%",
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className='absolute w-64 h-64 rounded-full blur-3xl opacity-8 animate-pulse'
          style={{
            background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
            top: "70%",
            right: "10%",
            transform: `translate(${-mousePosition.x * 0.015}px, ${
              -mousePosition.y * 0.015
            }px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className='relative text-center mb-16'>
        <h2 className='text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 custom-font'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600'>
            Lý thuyết cơ bản
          </span>
        </h2>
        <p className='text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto px-4'>
          Khám phá những nguyên tắc và quy luật cốt lõi của phép biện chứng duy
          vật
        </p>
        <div className='mt-8 flex justify-center'>
          <div className='w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse'></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className='max-w-6xl mx-auto px-4 mb-12'>
        <div className='flex flex-wrap justify-center gap-4'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative px-6 py-3 rounded-2xl border-2 font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? `border-${tab.color}-500 bg-${tab.color}-50 text-${tab.color}-700 shadow-lg`
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              <span className='text-xl mr-2'>{tab.icon}</span>
              {tab.title}
              {activeTab === tab.id && (
                <div
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-${tab.color}-500 rounded-full`}
                ></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className='max-w-6xl mx-auto px-4'>{getTabContent()}</div>
    </div>
  );
};

export default TheorySection;
