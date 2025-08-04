import portfolioData from '../data/portfolio.json';

export const getPortfolioData = () => {
  return portfolioData;
};

export const getPersonalInfo = () => {
  return portfolioData.personal;
};

export const getEducation = () => {
  return portfolioData.education;
};

export const getSkills = () => {
  return portfolioData.skills;
};

export const getProjects = () => {
  return portfolioData.projects;
};

export const getProblemSolvingStats = () => {
  return portfolioData.problemSolving;
};

export const getInterests = () => {
  return portfolioData.interests;
};

export const getExperience = () => {
  return portfolioData.experience || [];
};

export const getContactInfo = () => {
  return portfolioData.contact;
};

export const getProjectById = (id) => {
  return portfolioData.projects.find(project => project.id === id) || null;
};

export const getSkillsByCategory = (category) => {
  return portfolioData.skills[category] || [];
};

export const getSkillCategories = () => {
  return Object.keys(portfolioData.skills);
};