declare global {
  interface Window {
    google: {
      maps: {
        Map: new (mapDiv: HTMLElement, opts?: google.maps.MapOptions) => google.maps.Map;
        StreetViewPanorama: new (container: HTMLElement, opts?: google.maps.StreetViewPanoramaOptions) => google.maps.StreetViewPanorama;
        importLibrary: (library: string) => Promise<any>;
      };
    };
    initMap: () => void; // Asegurarse de que initMap esté declarado
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: HTMLElement, opts?: MapOptions);
      setStreetView(panorama: StreetViewPanorama): void;
    }

    interface MapOptions {
      center: LatLngLiteral;
      zoom: number;
    }

    class StreetViewPanorama {
      constructor(container: HTMLElement, opts?: StreetViewPanoramaOptions);
    }

    interface StreetViewPanoramaOptions {
      position: LatLngLiteral;
      pov: StreetViewPov;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface StreetViewPov {
      heading: number;
      pitch: number;
    }

    function importLibrary(library: string): Promise<any>;
  }
}
