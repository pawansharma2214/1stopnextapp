"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HotelDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log('hotel idddd', id);
  

  useEffect(() => {
    if (!id) return;

    const fetchHotel = async () => {
      try {
        const apiKey = "sand_a529eb63-8a0e-4640-ada6-f815b7d6dad0";
        const res = await fetch(
          `https://api.liteapi.travel/v3.0/data/hotel?hotelId=${id}`,
          { headers: { "X-API-Key": apiKey } }
        );

        if (!res.ok) throw new Error("Failed to fetch hotel");

        const json = await res.json();
        setHotel(json.data || null);
      } catch (err) {
        console.error(err);
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <p>Loading hotel details...</p>;
  if (!hotel) return <p>Hotel not found.</p>; 

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h1>{hotel.name}</h1>

      <div className="slider">
        {hotel.hotelImages.map((img, i) => (
          <div className="slide" key={i}>
            <img src={img.url} alt={img.caption || hotel.name} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .slider {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 10px;
        }
        .slide {
          scroll-snap-align: start;
          flex: none;
          width: 300px;
        }
        img {
          width: 100%;
          border-radius: 8px;
        }
      `}</style>

      {/* Hotel Description */}
      <div dangerouslySetInnerHTML={{ __html: hotel.hotelDescription }} />

      {/* You can continue with other sections like rooms, facilities, policies... */}
    </main>
  );
}
