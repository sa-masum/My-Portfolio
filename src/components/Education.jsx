import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { getEducation } from '../utils/dataLoader';

const Education = () => {
  const education = getEducation();

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap size={48} className="text-blue-600 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Education</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            My academic journey and educational background
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Education Cards */}
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              } lg:max-w-screen-lg mx-auto`}
            >
              {/* Timeline Connector */}
              <div className="hidden lg:flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                {index < education.length - 1 && (
                  <div className="w-1 h-32 bg-gradient-to-b from-blue-600 to-purple-600 mt-4"></div>
                )}
              </div>

              {/* Education Card */}
              <div className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  
                  {/* Left Side - Icon & Basic Info */}
                  <div className="md:w-1/3">
                    <div className="bg-white rounded-xl p-4 shadow-lg mb-4 inline-block">
                      <GraduationCap size={48} className="text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        <span className="text-sm">{edu.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-2" />
                        <span className="text-sm">{edu.location}</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <Award size={16} className="mr-2" />
                        <span className="text-sm font-semibold">
                          {edu.cgpa ? `CGPA: ${edu.cgpa}` : `GPA: ${edu.gpa}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Detailed Info */}
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {edu.degree}
                    </h3>
                    <h4 className="text-xl font-semibold text-blue-600 mb-4">
                      {edu.university}
                    </h4>
                    
                    {/* Relevant Courses */}
                    <div className="mt-6">
                      <div className="flex items-center mb-3">
                        <BookOpen size={20} className="text-purple-600 mr-2" />
                        <h5 className="font-semibold text-gray-800">Relevant Courses</h5>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevant_courses.map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <h4 className="text-3xl font-bold text-blue-600 mb-2">4+</h4>
            <p className="text-gray-700">Years of Study</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <h4 className="text-3xl font-bold text-purple-600 mb-2">3.27</h4>
            <p className="text-gray-700">Current CGPA</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <h4 className="text-3xl font-bold text-green-600 mb-2">2026</h4>
            <p className="text-gray-700">Expected Graduation</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;