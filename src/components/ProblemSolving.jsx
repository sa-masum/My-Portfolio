import React, { useState } from 'react';
import { Code2, Trophy, Target, Zap, ExternalLink, Award, TrendingUp } from 'lucide-react';
import { getProblemSolvingStats } from '../utils/dataLoader';

const ProblemSolving = () => {
  const stats = getProblemSolvingStats();

  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const platformColors = {
    leetcode: {
        primary: 'from-yellow-400 to-yellow-600',
        bg: 'from-yellow-50 to-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-200'
    },
    codeforces: {
        primary: 'from-indigo-400 to-indigo-600',
        bg: 'from-indigo-50 to-indigo-100',
        text: 'text-indigo-700',
        border: 'border-indigo-200'
    },
    codeshef: {
        primary: 'from-gray-600 to-gray-800',
        bg: 'from-gray-100 to-gray-200',
        text: 'text-gray-800',
        border: 'border-gray-300'
    },
    atcoder: {
        primary: 'from-cyan-400 to-cyan-600',
        bg: 'from-cyan-50 to-cyan-100',
        text: 'text-cyan-700',
        border: 'border-cyan-200'
    },
    hackerrank: {
        primary: 'from-emerald-400 to-emerald-600',
        bg: 'from-emerald-50 to-emerald-100',
        text: 'text-emerald-700',
        border: 'border-emerald-200'
    }
  };

  const platformLinks = {
    leetcode: `https://leetcode.com/${stats.leetcode.username}`,
    codeforces: `https://codeforces.com/profile/${stats.codeforces.username}`,
    codeshef: `https://www.codechef.com/users/${stats.codeshef.username}`,
    atcoder: `https://atcoder.jp/users/${stats.atcoder.username}`,
    hackerrank: `https://www.hackerrank.com/${stats.hackerrank.username}`
  };

  const handlePlatformClick = (platform) => {
    if (selectedPlatform === platform) {
      setSelectedPlatform(null);
    } else {
      setSelectedPlatform(platform);
    }
  };

  const PlatformCard = ({ platform, data, isActive, onClick }) => {
    const colors = platformColors[platform];
    
    return (
      <div
        onClick={onClick}
        className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
          isActive 
            ? `bg-gradient-to-br ${colors.bg} border-2 ${colors.border} shadow-xl transform scale-105`
            : 'bg-white border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-bold capitalize ${isActive ? colors.text : 'text-gray-900'}`}>
            {platform}
          </h3>
          <div className={`p-2 rounded-lg ${isActive ? `bg-gradient-to-r ${colors.primary}` : 'bg-gray-100'}`}>
            <Code2 size={20} className={isActive ? 'text-white' : 'text-gray-600'} />
          </div>
        </div>

        {platform === 'leetcode' && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Solved</span>
              <span className="font-bold">{data.solved.total}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <div className="text-green-600 font-bold">{data.solved.easy}</div>
                <div className="text-gray-500">Easy</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-600 font-bold">{data.solved.medium}</div>
                <div className="text-gray-500">Medium</div>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-bold">{data.solved.hard}</div>
                <div className="text-gray-500">Hard</div>
              </div>
            </div>
          </div>
        )}

        {platform === 'codeforces' && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Rating</span>
              <span className="font-bold">{data.rating || 'Unrated'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max Rating</span>
              <span className="font-bold">{data.maxRating || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rank</span>
              <span className="font-bold">{data.rank || 'Unrated'}</span>
            </div>
          </div>
        )}

        {platform === 'codeshef' && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Rating</span>
              <span className="font-bold">{data.rating || 'Unrated'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max Rating</span>
              <span className="font-bold">{data.maxRating || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rank</span>
              <span className="font-bold">{data.rank || 'Unrated'}</span>
            </div>
          </div>
        )}

        {platform === 'atcoder' && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Rating</span>
              <span className="font-bold">{data.rating || 'Unrated'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max Rating</span>
              <span className="font-bold">{data.maxRating || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rank</span>
              <span className="font-bold">{data.rank || 'Unrated'}</span>
            </div>
          </div>
        )}

        {platform === 'hackerrank' && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Stars</span>
              <span className="font-bold">{data.stars}</span>
            </div>
            <div className="text-sm">
              <div className="text-gray-600 mb-2">Badges</div>
              <div className="flex flex-wrap gap-1">
                {data.badges && data.badges.length > 0 ? (
                  data.badges.map((badge, index) => (
                    <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                      {badge}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">No badges yet</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const platformsToShow = selectedPlatform 
    ? { [selectedPlatform]: stats[selectedPlatform] }
    : Object.fromEntries(Object.entries(stats).filter(([key]) => key !== 'achievements'));

  return (
    <section id="leetcode" className="py-20 bg-gray-50">
      <div className="container-custom mx-4 md:mx-8 lg:mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Trophy size={48} className="text-blue-600 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Problem Solving</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            My competitive programming journey and coding achievements
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Platform Cards */}
        <div className={`grid gap-8 mb-12 ${
          selectedPlatform 
            ? 'grid-cols-1 max-w-md mx-auto' 
            : 'grid-cols-1 md:grid-cols-3'
        }`}>
          {Object.entries(platformsToShow).map(([platform, data]) => (
            <PlatformCard
              key={platform}
              platform={platform}
              data={data}
              isActive={selectedPlatform === platform}
              onClick={() => handlePlatformClick(platform)}
            />
          ))}
        </div>

        {/* Show "Click any platform to see detailed stats" when no platform is selected */}
        {!selectedPlatform && (
          <div className="text-center mb-12">
            <p className="text-gray-600 text-lg">
              Click any platform card to see detailed statistics
            </p>
          </div>
        )}

        {/* Detailed Stats for Selected Platform */}
        {selectedPlatform && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 capitalize flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${platformColors[selectedPlatform].primary}`}>
                  <Code2 size={24} className="text-white" />
                </div>
                {selectedPlatform} Statistics
              </h3>
              <a
                href={platformLinks[selectedPlatform]}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${platformColors[selectedPlatform].border} ${platformColors[selectedPlatform].text} hover:bg-gradient-to-r hover:${platformColors[selectedPlatform].primary} hover:text-white transition-all duration-200`}
              >
                <ExternalLink size={16} />
                Visit Profile
              </a>
            </div>

            {selectedPlatform === 'leetcode' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <Target size={32} className="text-orange-600 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-orange-600 mb-2">{stats.leetcode.solved.total}</h4>
                  <p className="text-gray-700">Problems Solved</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">{stats.leetcode.solved.easy}</div>
                  <p className="text-gray-700">Easy Problems</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.leetcode.solved.medium}</div>
                  <p className="text-gray-700">Medium Problems</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-2">{stats.leetcode.solved.hard}</div>
                  <p className="text-gray-700">Hard Problems</p>
                </div>
              </div>
            )}

            {selectedPlatform === 'codeforces' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <TrendingUp size={32} className="text-blue-600 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-blue-600 mb-2">{stats.codeforces.rating || 0}</h4>
                  <p className="text-gray-700">Current Rating</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <Trophy size={32} className="text-purple-600 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-purple-600 mb-2">{stats.codeforces.maxRating || 0}</h4>
                  <p className="text-gray-700">Max Rating</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
                  <Award size={32} className="text-indigo-600 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-indigo-600 mb-2">{stats.codeforces.rank || 'Unrated'}</h4>
                  <p className="text-gray-700">Current Rank</p>
                </div>
              </div>
            )}

            {selectedPlatform === 'codeshef' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
                  <TrendingUp size={32} className="text-gray-800 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-gray-800 mb-2">{stats.codeshef.rating || 0}</h4>
                  <p className="text-gray-700">Current Rating</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
                  <Trophy size={32} className="text-gray-800 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-gray-800 mb-2">{stats.codeshef.maxRating || 0}</h4>
                  <p className="text-gray-700">Max Rating</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
                  <Award size={32} className="text-gray-800 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-gray-800 mb-2">{stats.codeshef.rank || 'Unrated'}</h4>
                  <p className="text-gray-700">Current Rank</p>
                </div>
              </div>
            )}

            {selectedPlatform === 'atcoder' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl">
                  <TrendingUp size={32} className="text-cyan-700 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-cyan-700 mb-2">{stats.atcoder.rating || 0}</h4>
                  <p className="text-gray-700">Current Rating</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl">
                  <Trophy size={32} className="text-cyan-700 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-cyan-700 mb-2">{stats.atcoder.maxRating || 0}</h4>
                  <p className="text-gray-700">Max Rating</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl">
                  <Award size={32} className="text-cyan-700 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-cyan-700 mb-2">{stats.atcoder.rank || 'Unrated'}</h4>
                  <p className="text-gray-700">Current Rank</p>
                </div>
              </div>
            )}

            {selectedPlatform === 'hackerrank' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <Zap size={32} className="text-green-600 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-green-600 mb-2">{stats.hackerrank.stars}</h4>
                  <p className="text-gray-700">Stars Earned</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <Award size={32} className="text-yellow-600 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-yellow-600 mb-2">{stats.hackerrank.badges.length}</h4>
                  <p className="text-gray-700">Badges Earned</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Achievements - Only show when no platform is selected */}
        {!selectedPlatform && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Trophy size={24} className="text-yellow-500" />
              Achievements & Goals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-500 rounded-lg flex-shrink-0">
                      <Award size={16} className="text-white" />
                    </div>
                    <p className="text-gray-700 font-medium">{achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Let's Code Together!</h3>
            <p className="text-blue-100 mb-6">
              Always looking for coding challenges and collaboration opportunities
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Code2 size={20} />
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolving;