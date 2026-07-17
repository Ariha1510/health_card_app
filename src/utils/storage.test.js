/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveProfileToLocalDB, getAllProfiles, getProfileFromLocalDB } from './storage';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock Supabase to prevent actual DB calls during tests
vi.mock('./supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      upsert: vi.fn().mockResolvedValue({ error: null })
    }))
  }
}));

describe('Storage Utilities', () => {
    beforeEach(() => {
        window.localStorage.clear();
        vi.clearAllMocks();
    });

    it('should save a new profile to local storage', async () => {
        const profile = { id: 'NH-111', name: 'Test Worker' };
        await saveProfileToLocalDB(profile);
        
        const allProfiles = getAllProfiles();
        expect(allProfiles.length).toBe(1);
        expect(allProfiles[0].id).toBe('NH-111');
    });

    it('should update an existing profile in local storage', async () => {
        const profile1 = { id: 'NH-222', name: 'Old Name' };
        await saveProfileToLocalDB(profile1);
        
        const profile2 = { id: 'NH-222', name: 'New Name' };
        await saveProfileToLocalDB(profile2);
        
        const allProfiles = getAllProfiles();
        expect(allProfiles.length).toBe(1);
        expect(allProfiles[0].name).toBe('New Name');
    });

    it('should retrieve a specific profile by ID', async () => {
        const profile = { id: 'NH-333', name: 'Fetch Me' };
        await saveProfileToLocalDB(profile);
        
        const fetched = getProfileFromLocalDB('NH-333');
        expect(fetched).toBeDefined();
        expect(fetched.name).toBe('Fetch Me');
    });
});
