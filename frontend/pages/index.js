import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [salesReps, setSalesReps] = useState([])
  const [filteredReps, setFilteredReps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [question, setQuestion] = useState('')
  const [aiResponse, setAIResponse] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState('')

  useEffect(() => {
    fetch('http://localhost:8000/api/sales-reps')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data')
        return res.json()
      })
      .then(data => {
        setSalesReps(data)
        setFilteredReps(data)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleAskAI = async () => {
    const res = await fetch('http://localhost:8000/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    })
    const data = await res.json()
    setAIResponse(data.response)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    filterAndSort(value, sortKey)
  }

  const handleSort = (e) => {
    const key = e.target.value
    setSortKey(key)
    filterAndSort(searchTerm, key)
  }

  const filterAndSort = (search, sort) => {
    let reps = [...salesReps]
    if (search) {
      reps = reps.filter(rep =>
        rep.name.toLowerCase().includes(search.toLowerCase()) ||
        rep.region.toLowerCase().includes(search.toLowerCase()) ||
        rep.skills.join(' ').toLowerCase().includes(search.toLowerCase())
      )
    }
    if (sort === 'deals') {
      reps.sort((a, b) => b.deals.length - a.deals.length)
    } else if (sort === 'region') {
      reps.sort((a, b) => a.region.localeCompare(b.region))
    }
    setFilteredReps(reps)
  }

  const countByRegion = () => {
    const regionStats = {}
    salesReps.forEach(rep => {
      regionStats[rep.region] = (regionStats[rep.region] || 0) + 1
    })
    return regionStats
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Sales Dashboard</h1>

      {/* AI Section */}
      <div className="card p-4 mb-4">
        <h4>Ask the AI</h4>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Ask something about sales..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAskAI}>Ask</button>
        </div>
        {aiResponse && <div className="fst-italic">AI: {aiResponse}</div>}
      </div>

      {/* Search & Sort */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, region, or skills..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-6 mb-2">
          <select className="form-select" value={sortKey} onChange={handleSort}>
            <option value="">Sort by...</option>
            <option value="deals">Most Deals</option>
            <option value="region">Region</option>
          </select>
        </div>
      </div>

      {/* Region Stats */}
      <div className="mb-4">
        <h5>Sales Reps by Region:</h5>
        <ul>
          {Object.entries(countByRegion()).map(([region, count]) => (
            <li key={region}><strong>{region}:</strong> {count}</li>
          ))}
        </ul>
      </div>

      {/* Loading / Error / Data */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row">
          {filteredReps.length === 0 ? (
            <div className="text-center">No sales representatives found.</div>
          ) : (
            filteredReps.map((rep, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="card h-100 p-3">
                  <h5>{rep.name}</h5>
                  <p className="text-muted">{rep.role} - {rep.region}</p>
                  <p><strong>Skills:</strong> {rep.skills.join(', ')}</p>

                  <hr />
                  <p><strong>Deals:</strong></p>
                  <ul>
                    {rep.deals.map((deal, idx) => (
                      <li key={idx}>
                        {deal.client}: ${deal.value.toLocaleString()} ({deal.status})
                      </li>
                    ))}
                  </ul>

                  <p><strong>Clients:</strong></p>
                  <ul>
                    {rep.clients.map((client, idx) => (
                      <li key={idx}>
                        {client.name} ({client.industry}) - {client.contact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
