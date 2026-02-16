import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Enthusiast",
      image: "https://img.daisyui.com/images/stock/photo-1494790108377-be9c29b29330.webp",
      rating: 5,
      text: "Absolutely amazing food! The flavors are authentic and everything tastes fresh. Highly recommend their biryani and butter chicken! 🤤",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Regular Customer",
      image: "https://img.daisyui.com/images/stock/photo-1507003211169-0a1dd7228f2d.webp",
      rating: 5,
      text: "Best restaurant in town! Excellent service, quick delivery, and the food quality is unmatched. Will definitely order again! 👍",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Event Organizer",
      image: "https://img.daisyui.com/images/stock/photo-1438761681033-6461ffad8d80.webp",
      rating: 5,
      text: "Perfect for catering! They handled our event flawlessly. The food was delicious and the team was very professional. Thank you! ✨",
    },
    {
      id: 4,
      name: "David Park",
      role: "Tech Professional",
      image: "https://img.daisyui.com/images/stock/photo-1500648767791-00dcc994a43e.webp",
      rating: 5,
      text: "Love the convenient app and fast delivery. The desserts are incredible! This is now my go-to place for food. 🍰",
    },
  ];

  return (
    <section className="py-16 bg-linear-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ⭐ What Our Customers Say
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            🗣️ Read testimonials from our satisfied customers and see why they love us
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="carousel carousel-center w-full p-4 space-x-4 rounded-lg shadow-lg">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="carousel-item w-full sm:w-1/2 lg:w-1/3 shrink-0"
            >
              <div className="card bg-base-100 shadow-xl h-full border-2 border-primary hover:border-secondary hover:shadow-2xl transition-all duration-300">
                <div className="card-body p-6">
                  {/* Quote Icon */}
                  <div className="text-4xl text-primary opacity-20 mb-4">
                    <FaQuoteLeft />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-base text-base-content/80 italic mb-6 grow">
                    "{testimonial.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} size={18} className="text-warning" />
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-base-300">
                    <div className="avatar">
                      <div className="w-14 h-14 rounded-full overflow-hidden">
                        <img src={testimonial.image} alt={testimonial.name} />
                      </div>
                    </div>
                    <div className="grow">
                      <h4 className="font-bold text-primary">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-base-content/70">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="stat bg-base-100 shadow-lg rounded-lg border-l-4 border-primary">
            <div className="stat-title font-bold">😊 Happy Customers</div>
            <div className="stat-value text-primary">4.8k+</div>
            <div className="stat-desc">Growing every day</div>
          </div>
          <div className="stat bg-base-100 shadow-lg rounded-lg border-l-4 border-secondary">
            <div className="stat-title font-bold">⭐ Average Rating</div>
            <div className="stat-value text-secondary">4.9/5</div>
            <div className="stat-desc">Based on reviews</div>
          </div>
          <div className="stat bg-base-100 shadow-lg rounded-lg border-l-4 border-accent">
            <div className="stat-title font-bold">🍽️ Dishes Served</div>
            <div className="stat-value text-accent">12k+</div>
            <div className="stat-desc">This month</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
