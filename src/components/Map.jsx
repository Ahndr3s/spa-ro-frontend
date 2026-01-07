import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const Map = ({ 
  apiKey, 
//   initialCenter = { lat: 19.4326, lng: -99.1332 }, 
  initialCenter = { lat:21.12470636646733, lng:-101.68494305132022}, 
  initialZoom = 12,
  markerPosition = null, // { lat, lng }
  markerTitle = "Ubicación seleccionada",
  markerColor = "#FF0000" // Color rojo por defecto
}) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [apiKey]);

  useEffect(() => {
    if (map && markerPosition) {
      updateMarker(markerPosition);
    }
  }, [markerPosition, map]);

  const initializeMap = () => {
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom: initialZoom,
    });

    setMap(mapInstance);

    // Si hay posición inicial para el marcador, colocarlo
    if (markerPosition) {
      updateMarker(markerPosition, mapInstance);
    }
  };

  const updateMarker = (position, mapInstance = map) => {
    // Eliminar marcador anterior si existe
    if (marker) {
      marker.setMap(null);
    }

    // Crear nuevo marcador con color personalizado
    const newMarker = new window.google.maps.Marker({
      position: position,
      map: mapInstance,
      title: markerTitle,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: markerColor,
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 1,
        scale: 8
      }
    });

    setMarker(newMarker);
    mapInstance.panTo(position);

    // Obtener dirección (geocoding)
    getAddress(position);
  };

  const getAddress = (location) => {
    if (window.google.maps.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setAddress(results[0].formatted_address);
        } else {
          setAddress("Dirección no disponible");
        }
      });
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
      
      {markerPosition && (
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5' }}>
          <h3>Información de la ubicación</h3>
          <p><strong>Latitud:</strong> {markerPosition.lat.toFixed(6)}</p>
          <p><strong>Longitud:</strong> {markerPosition.lng.toFixed(6)}</p>
          <p><strong>Dirección:</strong> {address || "Cargando..."}</p>
        </div>
      )}
    </div>
  );
};

Map.propTypes = {
  apiKey: PropTypes.string,
  initialCenter: PropTypes.object,
  initialZoom: PropTypes.number,
  markerPosition: PropTypes.any,
  markerTitle: PropTypes.string,
  markerColor: PropTypes.string,
};