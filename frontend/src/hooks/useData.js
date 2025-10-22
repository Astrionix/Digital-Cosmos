import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useData = () => {
  const [data, setData] = useState({
    profile: null,
    projects: null,
    skills: null,
    socials: null,
    blogs: null,
    education: null,
    experience: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Load local data first (backend not available)
        console.log('Loading data from local JSON files...');
        const [
          profileData,
          projectsData,
          skillsData,
          socialsData,
          blogsData,
          educationData,
          experienceData
        ] = await Promise.all([
          import('../data/profile.json'),
          import('../data/projects.json'),
          import('../data/skills.json'),
          import('../data/socials.json'),
          import('../data/blogs.json'),
          import('../data/education.json'),
          import('../data/experience.json')
        ]);

        setData({
          profile: profileData.default,
          projects: projectsData.default,
          skills: skillsData.default,
          socials: socialsData.default,
          blogs: blogsData.default,
          education: educationData.default,
          experience: experienceData.default,
        });
        
        console.log('Local data loaded successfully!');
        
        // Optionally try to fetch from API in background (if available)
        try {
          const [
            profileRes,
            projectsRes,
            skillsRes,
            socialsRes,
            blogsRes,
            educationRes,
            experienceRes
          ] = await Promise.all([
            axios.get(`${API_BASE_URL}/api/profile`),
            axios.get(`${API_BASE_URL}/api/projects`),
            axios.get(`${API_BASE_URL}/api/skills`),
            axios.get(`${API_BASE_URL}/api/socials`),
            axios.get(`${API_BASE_URL}/api/blogs`),
            axios.get(`${API_BASE_URL}/api/education`),
            axios.get(`${API_BASE_URL}/api/experience`)
          ]);

          // Update with API data if available
          setData({
            profile: profileRes.data,
            projects: projectsRes.data,
            skills: skillsRes.data,
            socials: socialsRes.data,
            blogs: blogsRes.data,
            education: educationRes.data,
            experience: experienceRes.data,
          });
          
          console.log('API data loaded successfully!');
        } catch (apiErr) {
          console.log('API not available, using local data:', apiErr.message);
          // Keep using local data
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
        // Set empty data structure to prevent crashes
        setData({
          profile: {},
          projects: { projects: [] },
          skills: { categories: {} },
          socials: { links: {}, contact_info: {} },
          blogs: { blogs: [] },
          education: { education: [], certifications: [] },
          experience: { experiences: [], extracurricular: [] },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
