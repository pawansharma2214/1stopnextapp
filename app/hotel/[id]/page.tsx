"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

 type HotelImage = {
  url: string;
  urlHd: string;
  caption: string;
  order: number;
  defaultImage: boolean;
};


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
        {hotel.hotelImages.map((img: HotelImage, index: number) => (
          <div key={index} className="slide">
            <img src={img.url} alt={img.caption || hotel.name} />
          </div>
        ))}
      </div>

      <style jsx>{`
          .slider {
            display: flex;
            overflow-x: auto;
            gap: 14px;
            scroll-snap-type: x mandatory;
            padding: 10px;
          }
          .slide {
            flex: 0 0 auto;
            width: 300px;
            scroll-snap-align: start;
          }
          img {
            width: 100%;
            height: auto;
            border-radius: 10px;
          }
        `}</style>
     

      {/* Hotel Description */}
      <div dangerouslySetInnerHTML={{ __html: hotel.hotelDescription }} />

      {/* You can continue with other sections like rooms, facilities, policies... */}
    </main>
  );
}
