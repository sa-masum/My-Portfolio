// src/components/Projects.jsx
import React, { useState } from 'react';
import { ExternalLink, Github, Folder, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { getProjects } from '../utils/dataLoader';

const Projects = () => {
  const projects = getProjects();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const statusIcons = {
    'Completed': <CheckCircle size={16} className="text-green-500" />,
    'In Progress': <Clock size={16} className="text-yellow-500" />,
    'Planning': <AlertCircle size={16} className="text-blue-500" />
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Planning':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredProjects = projects.filter(project => 
    selectedFilter === 'all' || project.status === selectedFilter
  );

  const uniqueStatuses = [...new Set(projects.map(p => p.status))];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container-custom mx-4 md:mx-8 lg:mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Folder size={48} className="text-blue-600 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Projects</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              selectedFilter === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Projects ({projects.length})
          </button>
          {uniqueStatuses.map(status => (
            <button
              key={status}
              onClick={() => setSelectedFilter(status)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
                selectedFilter === status
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {statusIcons[status]}
              {status} ({projects.filter(p => p.status === status).length})
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x200/3b82f6/ffffff?text=${encodeURIComponent(project.name)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)} flex items-center gap-1`}>
                  {statusIcons[project.status]}
                  {project.status}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium border border-blue-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Features</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {project.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                    {project.features.length > 3 && (
                      <li className="text-blue-600 font-medium">
                        +{project.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {!project.live && !project.github && (
                    <div className="flex-1 bg-gray-100 text-gray-500 px-4 py-2 rounded-lg font-medium text-center">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Projects Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <h4 className="text-3xl font-bold text-blue-600 mb-2">{projects.length}</h4>
            <p className="text-gray-700">Total Projects</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <h4 className="text-3xl font-bold text-green-600 mb-2">
              {projects.filter(p => p.status === 'Completed').length}
            </h4>
            <p className="text-gray-700">Completed</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
            <h4 className="text-3xl font-bold text-yellow-600 mb-2">
              {projects.filter(p => p.status === 'In Progress').length}
            </h4>
            <p className="text-gray-700">In Progress</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Want to see more?</h3>
            <p className="text-blue-100 mb-6">
              Check out my GitHub for more projects and contributions
            </p>
            <a
              href="https://github.com/sa-masum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Github size={20} />
              Visit GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;