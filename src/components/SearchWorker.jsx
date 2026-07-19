import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SearchWorker = () => {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('worker_id');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        setSearched(true);
        try {
            let query = supabase.from('workers').select('*');
            
            if (searchType === 'worker_id') {
                query = query.ilike('worker_id', `%${searchQuery}%`);
            } else if (searchType === 'name') {
                query = query.ilike('name', `%${searchQuery}%`);
            } else if (searchType === 'phone') {
                query = query.ilike('phone', `%${searchQuery}%`);
            } else if (searchType === 'employer') {
                query = query.ilike('employer', `%${searchQuery}%`);
            }

            const { data, error } = await query;
            if (error) throw error;
            setResults(data || []);
        } catch (error) {
            console.error("Error searching workers:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="view-container active">
            <h2 style={{ marginBottom: '1.5rem' }}>{t('searchWorkerDb')}</h2>
            
            <div className="card-panel search-ledger-panel">
                <form onSubmit={handleSearch} className="search-bar-row">
                    <select
                        className="search-select"
                        value={searchType}
                        onChange={e => setSearchType(e.target.value)}
                    >
                        <option value="worker_id">{t('workerId')}</option>
                        <option value="name">{t('nameLabel')}</option>
                        <option value="phone">{t('phone')}</option>
                        <option value="employer">{t('employer')}</option>
                    </select>
                    <input
                        type="text"
                        placeholder={t('typeToSearch')}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
                        <Search size={18} style={{ marginRight: '5px' }} />
                        {loading ? t('searching') : t('search')}
                    </button>
                </form>

                {searched && (
                    <div className="search-results-table-container" style={{ marginTop: '2rem' }}>
                        <table className="search-results-table">
                            <thead>
                                <tr>
                                    <th>{t('workerId')}</th>
                                    <th>{t('nameLabel')}</th>
                                    <th>{t('ageGender')}</th>
                                    <th>{t('bloodGroup')}</th>
                                    <th>{t('employer')}</th>
                                    <th>{t('phone')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map(worker => (
                                    <tr key={worker.id}>
                                        <td style={{ fontWeight: 'bold' }}>{worker.worker_id}</td>
                                        <td>{worker.name}</td>
                                        <td>{worker.age} / {worker.gender}</td>
                                        <td>{worker.blood_group || '-'}</td>
                                        <td>{worker.employer || '-'}</td>
                                        <td>{worker.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {results.length === 0 && (
                            <div className="table-empty-state">
                                {t('noWorkersFound')}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchWorker;
