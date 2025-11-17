"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
type Hotel = {
  id: string;
  name: string;
  main_photo?: string;
  city?: string;
  country?: string;
  starRating?: number;
  hotelDescription?: string;
  hotelImages?: {
    url: string;
    caption?: string;
    defaultImage?: boolean;
  }[];
};
export default function HotelsList() {
  //const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // current page
  const [total, setTotal] = useState(0); // total hotels
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const limit = 10;

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const apiKey = "sand_a529eb63-8a0e-4640-ada6-f815b7d6dad0";
        const offset = (page - 1) * limit;
        const url = `https://api.liteapi.travel/v3.0/data/hotels?countryCode=IN&limit=${limit}&offset=${offset}`;
        const res = await fetch(url, {
          headers: { "X-API-Key": apiKey },
        });

        if (!res.ok) {
          console.error("API error:", res.status);
          setHotels([]);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setHotels(data.data || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Fetch error:", err);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  // Function to generate page numbers for pagination bar
  // Function to generate page numbers with ellipsis
const getPageNumbers = () => {
  const delta = 2; // pages around current
  const pages = [];
  const totalPagesArray = [];

  // Add first pages
  for (let i = 1; i <= Math.min(2, totalPages); i++) {
    totalPagesArray.push(i);
  }

  // Add pages around current
  for (let i = Math.max(3, page - delta); i <= Math.min(totalPages - 2, page + delta); i++) {
    totalPagesArray.push(i);
  }

  // Add last pages
  for (let i = Math.max(totalPages - 1, 3); i <= totalPages; i++) {
    totalPagesArray.push(i);
  }

  // Remove duplicates and sort
  const uniquePages = [...new Set(totalPagesArray)].sort((a, b) => a - b);

  // Insert ellipsis
  for (let i = 0; i < uniquePages.length; i++) {
    pages.push(uniquePages[i]);
    if (i < uniquePages.length - 1 && uniquePages[i + 1] - uniquePages[i] > 1) {
      pages.push("...");
    }
  }

  return pages;
};


  return (
    <main className="max-w-[1200px] mx-auto p-5" >
      <h1 className="text-2xl text-center mb-8">
        Hotels in India
      </h1>

      {loading ? (
        <p className="text-center">Loading hotels...</p>
      ) : hotels.length === 0 ? (
        <p className="text-center">No hotels found.</p>
      ) : (
        <>
          <div className="grid gap-8">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}                 
                style={{
                  display: "flex",
                  gap: "20px",
                  marginBottom: "30px",
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                <div className="left-section thumb">
                  
                    <img src={hotel.thumbnail || hotel.main_photo || null} alt={hotel.name} width={250} style={{ borderRadius: "8px" }} />
                  
                </div>

                <div className="hotel-card-details right-section" style={{ flex: 1 }}>
                  <h2 style={{ marginTop: 0 }}>{hotel.name}</h2>
                  {hotel.hotelDescription && (
                    <p dangerouslySetInnerHTML={{ __html: hotel.hotelDescription }} />
                  )}
                  <p>⭐ {hotel.stars || "N/A"} ({hotel.reviewCount || 0} reviews)</p>
                  <p>{hotel.currency}</p>
                  {/* - {hotel.price_ranges?.maximum || "N/A" */}

                  <div style={{ marginTop: "10px" }}>
                    <Link href={`/hotel/${encodeURIComponent(hotel.id)}`} className="hotel-card">
                      <span style={{ color: "#2563eb", fontSize: "0.85rem", textDecoration: "underline" }}>
                        View details →
                      </span>
                    </Link>
                  </div>

                  {hotel.url && (
                    <p style={{ marginTop: "10px" }}>
                      <a href={hotel.url} target="_blank" rel="noopener noreferrer">
                        View on TripAdvisor
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Numeric Pagination */}
          {totalPages > 1 && (
            <div style={{ textAlign: "center", marginTop: "20px", display: "flex", justifyContent: "center", gap: "5px", flexWrap: "wrap" }}>
            <button onClick={() => setPage(1)} disabled={page === 1}>First</button>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>Prev</button>

            {getPageNumbers().map((num, idx) =>
              num === "..." ? (
                <span key={idx} style={{ padding: "0 5px" }}>…</span>
              ) : (
                <button
                  key={idx}
                  onClick={() => setPage(num)}
                  style={{ fontWeight: num === page ? "bold" : "normal", textDecoration: num === page ? "underline" : "none" }}
                >
                  {num}
                </button>
              )
            )}

            <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>Next</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last</button>
          </div>

          )}
        </>
      )}
    </main>
  );
}