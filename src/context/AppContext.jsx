import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { getCars, removeCar, saveCar } from "../services/carService";
import { createCarInsights } from "../utils/scoring";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    if (!user?.uid) {
      setCars([]);
      return;
    }

    let active = true;

    async function loadCars() {
      setLoadingCars(true);
      setDataError("");

      try {
        const items = await getCars(user.uid);
        if (active) {
          setCars(items);
        }
      } catch (error) {
        if (active) {
          setDataError(error.message || "Unable to load saved vehicles.");
        }
      } finally {
        if (active) {
          setLoadingCars(false);
        }
      }
    }

    loadCars();
    return () => {
      active = false;
    };
  }, [user?.uid]);

  const upsertCar = useCallback(async (payload) => {
    if (!user?.uid) {
      return null;
    }

    setDataError("");
    const carWithInsights = {
      ...payload,
      insights: createCarInsights(payload),
    };
    const savedCar = await saveCar(user.uid, carWithInsights);

    setCars((currentCars) => {
      const exists = currentCars.some((car) => car.id === savedCar.id);
      if (exists) {
        return currentCars.map((car) => (car.id === savedCar.id ? savedCar : car));
      }

      return [savedCar, ...currentCars];
    });

    return savedCar;
  }, [user?.uid]);

  const deleteCar = useCallback(async (carId) => {
    if (!user?.uid) {
      return;
    }

    setDataError("");
    await removeCar(user.uid, carId);
    setCars((currentCars) => currentCars.filter((car) => car.id !== carId));
  }, [user?.uid]);

  const value = useMemo(
    () => ({
      cars,
      loadingCars,
      dataError,
      upsertCar,
      deleteCar,
      getCarById: (carId) => cars.find((car) => car.id === carId) || null,
    }),
    [cars, loadingCars, dataError]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
}
