// src/components/Skills.jsx
import React, { useState } from 'react';
import { Code, Globe, Wrench, Star, ChevronRight } from 'lucide-react';
import { getSkills } from '../utils/dataLoader';

const Skills = () => {
  const skills = getSkills();
  const [selectedCategory, setSelectedCategory] = useState('programming');

  const categoryIcons = {
    programming: <Code size={24} />,
    web: <Globe size={24} />,
    tools: <Wrench size={24} />,
    other: <Star size={24} />
  };

  const categoryColors = {
    programming: 'from-blue-500 to-blue-600',
    web: 'from-green-500 to-green-600',
    tools: 'from-purple-500 to-purple-600',
    other: 'from-orange-500 to-orange-600'
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'beginner':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getLevelWidth = (level) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'w-5/6';
      case 'intermediate':
        return 'w-4/6';
      case 'beginner':
        return 'w-2/6';
      default:
        return 'w-1/6';
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Code size={48} className="text-blue-600 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Skills</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Categories</h3>
              <div className="space-y-3">
                {Object.keys(skills).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                      selectedCategory === category
                        ? `bg-gradient-to-r ${categoryColors[category]} text-white shadow-lg`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      {categoryIcons[category]}
                      <span className="ml-3 font-semibold capitalize">
                        {category === 'other' ? 'Soft Skills' : category}
                      </span>
                    </div>
                    <ChevronRight
                      size={20}
                      className={`transition-transform ${
                        selectedCategory === category ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-8">
                {categoryIcons[selectedCategory]}
                <h3 className="text-2xl font-bold text-gray-900 ml-3 capitalize">
                  {selectedCategory === 'other' ? 'Soft Skills' : `${selectedCategory} Skills`}
                </h3>
              </div>

              <div className="space-y-6">
                {skills[selectedCategory]?.map((skill, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${getLevelColor(skill.level)} mr-3`}></div>
                        <h4 className="text-lg font-semibold text-gray-900">{skill.name}</h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        skill.level.toLowerCase() === 'advanced' 
                          ? 'bg-green-100 text-green-800'
                          : skill.level.toLowerCase() === 'intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Overview Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, skillList]) => (
            <div
              key={category}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${categoryColors[category]} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                {React.cloneElement(categoryIcons[category], { className: 'text-white' })}
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{skillList.length}</h4>
              <p className="text-gray-600 text-sm capitalize">
                {category === 'other' ? 'Soft Skills' : category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;