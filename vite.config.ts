import path from 'path';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          about: resolve(__dirname, 'about.html'),
          petOwner: resolve(__dirname, 'pet-owner.html'),
          veterinarian: resolve(__dirname, 'veterinarian.html'),
          shelter: resolve(__dirname, 'animal-shelter.html'),
          petProfile: resolve(__dirname, 'pet-profile.html'),
          feedingGuide: resolve(__dirname, 'feeding-guide.html'),
          groomingVideos: resolve(__dirname, 'grooming-videos.html'),
          healthTips: resolve(__dirname, 'health-tips.html'),
          trainingTips: resolve(__dirname, 'training-tips.html'),
          products: resolve(__dirname, 'products.html'),
          emergency: resolve(__dirname, 'emergency.html'),
          feedback: resolve(__dirname, 'feedback.html'),
          team: resolve(__dirname, 'team.html'),
          contact: resolve(__dirname, 'contact.html'),
          careCalendar: resolve(__dirname, 'care-calendar.html'),
          petCareJournal: resolve(__dirname, 'pet-care-journal.html'),
          petCareQuiz: resolve(__dirname, 'pet-care-quiz.html'),
          petFirstAid: resolve(__dirname, 'pet-first-aid.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true as const,
    },
  };
});
