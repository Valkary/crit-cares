type ApacheScoreForm = {
    age: number;
    temperature: number;
    blood_pressure: number;
    ph: number;
    heart_rate: number;
    respiratory_rate: number;
    sodium: number;
    potassium: number;
    creatinine: number;
    acute_renal_failure?: boolean; // Optional flag for acute renal failure
    chronic_renal_failure?: boolean; // Optional flag for chronic renal failure
};

function calculate_age_score(age: number): number {
    switch (true) {
        case age <= 44: return 0;
        case age <= 54: return 2;
        case age <= 64: return 3;
        case age <= 74: return 5;
        default: return 6;
    }
}

function calculate_temperature_score(temp: number): number {
    switch (true) {
        case temp >= 41: return 4;
        case temp >= 39: return 3;
        case temp >= 38.5: return 1;
        case temp >= 36: return 0;
        case temp >= 34: return 1;
        case temp >= 32: return 2;
        case temp >= 30: return 3;
        default: return 4;
    }
}

function calculate_blood_pressure_score(bp: number): number {
    switch (true) {
        case bp > 159: return 4;
        case bp > 129: return 3;
        case bp > 109: return 2;
        case bp > 69: return 0;
        case bp > 49: return 2;
        default: return 4;
    }
}

function calculate_ph_score(ph: number): number {
    switch (true) {
        case ph >= 7.70: return 4;
        case ph >= 7.60: return 3;
        case ph >= 7.50: return 1;
        case ph >= 7.33: return 0;
        case ph >= 7.25: return 2;
        case ph >= 7.15: return 3;
        default: return 4;
    }
}

function calculate_heart_rate_score(hr: number): number {
    switch (true) {
        case hr >= 180: return 4;
        case hr >= 140: return 3;
        case hr >= 110: return 2;
        case hr >= 70: return 0;
        case hr >= 55: return 2;
        case hr >= 40: return 3;
        default: return 4;
    }
}

function calculate_respiratory_rate_score(rr: number): number {
    switch (true) {
        case rr >= 50: return 4;
        case rr >= 35: return 3;
        case rr >= 25: return 1;
        case rr >= 12: return 0;
        case rr >= 10: return 1;
        case rr >= 6: return 2;
        default: return 4;
    }
}

function calculate_sodium_score(na: number): number {
    switch (true) {
        case na >= 180: return 4;
        case na >= 160: return 3;
        case na >= 155: return 2;
        case na >= 150: return 1;
        case na >= 130: return 0;
        case na >= 120: return 2;
        case na >= 111: return 3;
        default: return 4;
    }
}

function calculate_potassium_score(k: number): number {
    switch (true) {
        case k >= 7.0: return 4;
        case k >= 6.0: return 3;
        case k >= 5.5: return 1;
        case k >= 3.5: return 0;
        case k >= 3.0: return 1;
        case k >= 2.5: return 2;
        default: return 4;
    }
}

function calculate_creatinine_score(creatinine: number, acute: boolean, chronic: boolean): number {
    switch (true) {
        case creatinine >= 3.5 && acute: return 8;
        case creatinine >= 2.0 && creatinine < 3.5 && acute: return 6;
        case creatinine >= 3.5 && chronic: return 4;
        case creatinine >= 1.5 && creatinine < 2.0 && acute: return 4;
        case creatinine >= 2.0 && creatinine < 3.5 && chronic: return 3;
        case creatinine >= 1.5 && creatinine < 2.0 && chronic: return 2;
        case creatinine >= 0.6 && creatinine < 1.5: return 0;
        default: return 2;
    }
}

function calculate_hematocritic_score(hematocritic: number): number {
    switch (true) {
        case hematocritic >= 60: return 4;
        case hematocritic >= 50 && hematocritic < 60: return 2;
        case hematocritic >= 46 && hematocritic < 50: return 1;
        case hematocritic >= 30 && hematocritic < 46: return 0;
        case hematocritic >= 20 && hematocritic < 30: return 2;
        default: return 4;
    }
}

function calculate_white_cell_score(cells: number): number {
    switch (true) {
        case cells >= 40: return 4;
        case cells >= 20 && cells < 40: return 2;
        case cells >= 15 && cells < 20: return 1;
        case cells >= 3 && cells < 15: return 0;
        case cells >= 1 && cells < 3: return 2;
        default: return 4;
    }
}

export function calculate_apache_score(form: ApacheScoreForm): number {
    const age_score = calculate_age_score(form.age);
    const temp_score = calculate_temperature_score(form.temperature);
    const bp_score = calculate_blood_pressure_score(form.blood_pressure);
    const ph_score = calculate_ph_score(form.ph);
    const hr_score = calculate_heart_rate_score(form.heart_rate);
    const rr_score = calculate_respiratory_rate_score(form.respiratory_rate);
    const na_score = calculate_sodium_score(form.sodium);
    const k_score = calculate_potassium_score(form.potassium);
    const creatinine_score = calculate_creatinine_score(form.creatinine, form.acute_renal_failure || false, form.chronic_renal_failure || false);

    return age_score + temp_score + bp_score + ph_score + hr_score + rr_score + na_score + k_score + creatinine_score;
}

export function get_survival_percentage(apache_score: number, is_postoperative: boolean = false): number {
    switch (true) {
        case apache_score <= 4: return is_postoperative ? 99 : 96;
        case apache_score <= 9: return is_postoperative ? 97 : 92;
        case apache_score <= 14: return is_postoperative ? 93 : 85;
        case apache_score <= 19: return is_postoperative ? 88 : 75;
        case apache_score <= 24: return is_postoperative ? 70 : 60;
        case apache_score <= 29: return is_postoperative ? 65 : 45;
        case apache_score <= 34: return is_postoperative ? 27 : 27;
        default: return is_postoperative ? 12 : 15;
    }
}
