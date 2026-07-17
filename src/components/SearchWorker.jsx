import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Search } from 'lucide-react';

const SearchWorker = () => {
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
            <h2 style={{ marginBottom: '1.5rem' }}>Search Worker Database</h2>
            
            <div className="card-panel search-ledger-panel">
                <form onSubmit={handleSearch} className="search-bar-row">
                    <select
                        className="search-select"
                        value={searchType}
                        onChange={e => setSearchType(e.target.value)}
                    >
                        <option value="worker_id">Worker ID</option>
                        <option value="name">Name</option>
                        <option value="phone">Phone</option>
                        <option value="employer">Employer</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Type to search..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
                        <Search size={18} style={{ marginRight: '5px' }} />
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                {searched && (
                    <div className="search-results-table-container" style={{ marginTop: '2rem' }}>
                        <table className="search-results-table">
                            <thead>
                                <tr>
                                    <th>Worker ID</th>
                                    <th>Name</th>
                                    <th>Age/Gender</th>
                                    <th>Blood Group</th>
                                    <th>Employer</th>
                                    <th>Phone</th>
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
                                No workers found matching your query.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchWorker;
