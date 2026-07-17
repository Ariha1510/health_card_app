import { supabase } from './supabaseClient';

const DB_KEY = 'nh_patient_profiles';

export const saveProfileToLocalDB = async (profile) => {
    // 1. Save to local storage for offline capability
    const existing = getAllProfiles();
    const index = existing.findIndex(p => p.id === profile.id);
    if (index >= 0) {
        existing[index] = profile;
    } else {
        existing.push(profile);
    }
    localStorage.setItem(DB_KEY, JSON.stringify(existing));

    // 2. Sync to Supabase PostgreSQL Database (if connected)
    try {
        const { error } = await supabase
            .from('patients')
            .upsert({ 
                id: profile.id, 
                full_name: profile.name, 
                age: parseInt(profile.age), 
                gender: profile.gender, 
                blood_group: profile.blood, 
                contact_phone: profile.phone,
                encrypted_payload: profile.encrypted_payload // Hypothetical field
            });
            
        if (error) console.error("Supabase sync error:", error.message);
    } catch (err) {
        // Silently fail if Supabase isn't configured yet
        console.warn("Could not sync to Supabase. Check configuration.", err);
    }
};

export const getProfileFromLocalDB = (id) => {
    try {
        const db = JSON.parse(localStorage.getItem(DB_KEY)) || [];
        return db.find(p => p.id === id) || null;
    } catch (error) {
        return null;
    }
};

export const getAllProfiles = () => {
    try {
        return JSON.parse(localStorage.getItem(DB_KEY)) || [];
    } catch (error) {
        return [];
    }
};
