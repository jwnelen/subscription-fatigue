import { useState } from "react";

import Head from "next/head";
import importedData from "../data/subscriptions.json";
import importedCategories from "../data/categories.json";

import Footer from "../components/footer";
import Subscription from "../components/subscription";
import DisplayTotal from "../components/totalDisplay";

import { Button } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [data, setData] = useState(importedData);
  const [categories, setCategories] = useState(importedCategories);

  const currentTotal = data.reduce((acc, curr) => {
    const subscription = data.find((item) => item.id === curr.id);
    return acc + (isNaN(subscription.std_price) ? 0 : subscription.std_price);
  }, 0);

  const restoreDefaults = () => {
    setData(importedData);
    setCategories(importedCategories);
  };

  const addCategory = () => {
    setCategories((c) => [
      ...c,
      {
        id: uuidv4(),
        name: "New category",
      },
    ]);
  };

  const addSubscription = (cat) => {
    setData((d) => [
      ...d,
      {
        category: cat,
        name: "New subscription",
        std_price: 0,
        id: uuidv4(),
      },
    ]);
  };

  return (
    <div>
      <Head>
        <title>Subscriptions Fatigue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center flex justify-center flex-col items-center">
        <h1 className="text-3xl my-10">The Subscription Fatigue</h1>

        <div className="container mx-auto h-full mb-20">
          {categories.map((category, index) => {
            return (
              <div key={`s-${index}`}>
                <div className="flex flex-row gap-3 justify-center lg:w-1/2 mx-auto">
                  <input
                    className="text-2xl font-bold text-center p-2 w-full"
                    value={category.name}
                    onChange={(e) => {
                      setCategories((c) => {
                        const newCategories = c.map((item) => {
                          if (item.id === category.id) {
                            return {
                              ...item,
                              name: e.target.value,
                            };
                          } else {
                            return item;
                          }
                        });
                        return newCategoriess;
                      });
                    }}
                  ></input>
                </div>
                <div className="flex flex-col items-center gap-2 w-2/3 lg:w-1/2 mx-auto">
                  {data
                    .filter((x) => x.category === category.id)
                    .map((subscription, index) => {
                      return (
                        <Subscription
                          subscription={subscription}
                          index={index}
                          key={`s-${index}`}
                          deleteSubscription={() => {
                            setData((d) =>
                              d.filter((item) => item.id !== subscription.id)
                            );
                          }}
                          setSubscription={(newSubscription) => {
                            setData((d) => {
                              const newSubscriptions = d.map((item) => {
                                if (item.id === subscription.id) {
                                  return newSubscription;
                                } else {
                                  return item;
                                }
                              });
                              return newSubscriptions;
                            });
                          }}
                        />
                      );
                    })}
                  <div className="border solid bg-gray-50 rounded w-full flex justify-center p-2 mb-4">
                    <button
                      className=""
                      onClickCapture={(e) => addSubscription(category.id)}
                    >
                      <svg
                        className="w-8 h-8 text-green-400 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="mt-10 mb-32 flex justify-center gap-4">
            <Button
              className="text-xl bg-green-500 rounded"
              onClick={() => addCategory()}
            >
              Add new category
            </Button>
            <Button
              className="px-4 rounded w-fit text-black hover:border-black bg-gray-200"
              onClick={restoreDefaults}
            >
              Restore Defaults
              {/* <svg
                className="w-6 h-6 ml-4 text-gray-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 14"
                // flip it horizontally
                style={{ transform: "scaleX(-1)" }}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m12 7 3-3-3-3m0 12H5.5a4.5 4.5 0 1 1 0-9H14"
                />
              </svg> */}
            </Button>
          </div>
        </div>

        <DisplayTotal total={currentTotal}></DisplayTotal>
      </main>
      <Footer />
    </div>
  );
}
