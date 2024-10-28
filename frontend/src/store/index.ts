import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import theme from "./theme/themeSlice";
import auth from "./auth/authSlice";
import tasks from "./tasks/taskSlice";

const rootPresisistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "auth", "tasks"],
};
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};
const tasksPersistConfig = {
  key: "tasks",
  storage,
  blacklist: ["loading", "error", "task"],
};
const rootReducer = combineReducers({
  theme,
  auth: persistReducer(authPersistConfig, auth),
  tasks: persistReducer(tasksPersistConfig, tasks),
});

const persistedReducer = persistReducer(rootPresisistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export { store, persistor };
