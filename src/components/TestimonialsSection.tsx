import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface TestimonialsSectionProps {
  language: Language;
}

const TestimonialsSection = ({ language }: TestimonialsSectionProps) => {
  const t = translations[language];

  const testimonials = [
    {
      id: 1,
      name: 'Alex Thompson',
      role: 'Graduate Student',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      text: 'Finding accommodation was a breeze with FindMySpace. The verification process gave me peace of mind, and I found the perfect place near my university.',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'International Student',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      text: 'As an international student, I was worried about finding a safe place to stay. FindMySpace made it easy and secure. Highly recommended!',
      rating: 5
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      role: 'Property Owner',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      text: 'Managing my properties through FindMySpace has been fantastic. The platform is intuitive, and the support team is always helpful.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read about the experiences of students and property owners who have found success with FindMySpace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 relative hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-blue-100" />
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;