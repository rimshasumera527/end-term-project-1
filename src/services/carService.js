import { isSupabaseConfigured, supabase } from "./supabase";

const STORAGE_PREFIX = "cartrust_cars";
const USER_METADATA_CARS_KEY = "car_reports";

function storageKey(userId) {
  return `${STORAGE_PREFIX}_${userId}`;
}

function readLocalCars(userId) {
  return JSON.parse(window.localStorage.getItem(storageKey(userId)) || "[]");
}

function writeLocalCars(userId, cars) {
  window.localStorage.setItem(storageKey(userId), JSON.stringify(cars));
}

function sortCars(cars) {
  return [...cars].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

async function getSupabaseUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message || "Unable to access Supabase user data.");
  }

  if (!data.user) {
    throw new Error("No authenticated Supabase user was found.");
  }

  return data.user;
}

export async function getCars(userId) {
  if (!userId) {
    return [];
  }

  if (isSupabaseConfigured) {
    const user = await getSupabaseUser();
    return sortCars(user.user_metadata?.[USER_METADATA_CARS_KEY] || []);
  }

  return sortCars(readLocalCars(userId));
}

export async function saveCar(userId, car) {
  const timestamp = new Date().toISOString();
  const payload = {
    ...car,
    updatedAt: timestamp,
  };

  if (isSupabaseConfigured) {
    const user = await getSupabaseUser();
    const metadata = user.user_metadata || {};
    const currentCars = metadata[USER_METADATA_CARS_KEY] || [];

    let nextCars;
    let savedCar;

    if (car.id) {
      nextCars = currentCars.map((item) => {
        if (item.id !== car.id) {
          return item;
        }

        savedCar = {
          ...item,
          ...payload,
        };
        return savedCar;
      });
    } else {
      savedCar = {
        ...payload,
        id: crypto.randomUUID(),
        createdAt: timestamp,
      };
      nextCars = [savedCar, ...currentCars];
    }

    const { data, error } = await supabase.auth.updateUser({
      data: {
        ...metadata,
        [USER_METADATA_CARS_KEY]: nextCars,
      },
    });

    if (error) {
      throw new Error(error.message || "Unable to save the car report to Supabase.");
    }

    if (!data.user) {
      throw new Error("Supabase did not return the updated user after saving the car report.");
    }

    return sortCars(data.user.user_metadata?.[USER_METADATA_CARS_KEY] || []).find(
      (item) => item.id === savedCar.id
    );
  }

  const cars = readLocalCars(userId);

  if (car.id) {
    const updatedCars = cars.map((item) => (item.id === car.id ? { ...item, ...payload } : item));
    writeLocalCars(userId, updatedCars);
    return updatedCars.find((item) => item.id === car.id);
  }

  const createdCar = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: timestamp,
  };

  writeLocalCars(userId, [createdCar, ...cars]);
  return createdCar;
}

export async function removeCar(userId, carId) {
  if (isSupabaseConfigured) {
    const user = await getSupabaseUser();
    const metadata = user.user_metadata || {};
    const currentCars = metadata[USER_METADATA_CARS_KEY] || [];
    const nextCars = currentCars.filter((car) => car.id !== carId);

    const { error } = await supabase.auth.updateUser({
      data: {
        ...metadata,
        [USER_METADATA_CARS_KEY]: nextCars,
      },
    });

    if (error) {
      throw new Error(error.message || "Unable to delete the car report from Supabase.");
    }

    return;
  }

  const nextCars = readLocalCars(userId).filter((car) => car.id !== carId);
  writeLocalCars(userId, nextCars);
}
