-- Create workers table
CREATE TABLE workers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id VARCHAR(50) UNIQUE NOT NULL, -- For searching, can be generated or manual
    name VARCHAR(255) NOT NULL,
    age INT,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    phone VARCHAR(20),
    emergency_contact VARCHAR(20),
    photo_url TEXT,
    address TEXT,
    occupation VARCHAR(255),
    employer VARCHAR(255),
    worksite VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create screenings table
CREATE TABLE screenings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    camp_location VARCHAR(255),
    doctor_name VARCHAR(255),
    bp_systolic INT,
    bp_diastolic INT,
    sugar_level INT,
    bmi DECIMAL(5, 2),
    temperature DECIMAL(5, 2),
    oxygen_level INT,
    symptoms TEXT,
    diagnosis TEXT,
    prescription TEXT,
    lab_reports TEXT,
    vaccinations TEXT,
    referral TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create follow_ups table
CREATE TABLE follow_ups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    screening_id UUID REFERENCES screenings(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Row Level Security (RLS) if needed. 
-- For MVP, we can allow authenticated users to read/write.
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenings ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated full access to workers" ON workers
    FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated full access to screenings" ON screenings
    FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated full access to follow_ups" ON follow_ups
    FOR ALL TO authenticated USING (true);

-- Create user_roles table
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('doctor', 'volunteer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create doctors table
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255),
    qualification TEXT,
    available_times TEXT,
    contact_info VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated full access to user_roles" ON user_roles
    FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated full access to doctors" ON doctors
    FOR ALL TO authenticated USING (true);
