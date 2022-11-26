import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from "leaflet";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../redux/slices/dashboard';
import styles from './index.module.css'
import { ChartBar } from '../../components/ChartBar/ChartBar';

function Dashboard() {
  const mapCenter = [66.25, 94.15]
  const dispatch = useDispatch();
  const location = useSelector((state) => (state.dashboard.location));
  const [citiesCount, setCitiesCount] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const GROUPED_BAR_CHART_DATA = [
    { label: "CheckPoint 1", values: [31, 32, 35] },
    { label: "CheckPoint 2", values: [27, 32, 33] },
    { label: "CheckPoint 3", values: [27, 32, 33] },
    { label: "CheckPoint 4", values: [25, 32, 32] },
    { label: "CheckPoint 5", values: [25, 32, 32] },
    { label: "CheckPoint 6", values: [25, 32, 32] }
  ];

  useEffect(() => {
    dispatch(fetchLocations());
  }, [])

  useEffect(() => {
    if(location){
      const cities = location.map((item)=>(item.city));
      const c = cities.reduce(function(acc, el) {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
      }, {});
      setCitiesCount(c);
      setIsLoading(true);
    }
  }, [location])

  const DefaultIcon = L.icon({
    iconUrl:'/marker.png',
    iconSize: [35,35]
  });

  return (

    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.metrics}>
          <div className={styles.map}>
            <div className={styles.teamHeader}>Карта</div>
            <MapContainer center={mapCenter} zoom={3} scrollWheelZoom={false}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {isLoading &&
                location.map((obj, index) => (
                <Marker position={[obj.lat,obj.lon]} icon = {DefaultIcon} key={index}>
                <Popup>
                Количество участников в {obj.city}: {citiesCount[obj.city]}
                </Popup>
                </Marker> 
                )) 
                }
            </MapContainer></div>
          <div className={styles.info}>
            <div className={styles.chartBar}><ChartBar data={GROUPED_BAR_CHART_DATA}/></div>
            <div className={styles.newUsers}>
              <div className={styles.teamHeader}>Пользователи</div>
            </div>
          </div>
        </div>
        <div className={styles.newTeams}>
          <div className={styles.teamHeader}>Новые команды</div>
        </div>
      </div>
    </div>

    
  );
}

export default Dashboard;
