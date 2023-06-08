import React, { useMemo, useRef, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import useSwr from "swr";

import { Card, HomeHeader, FocusedStatusBar } from "../components";
import { COLORS } from "../constants";
import { getLaunches } from "../fetcher";

const Home = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<any>({});
  const allDatas = useRef<any[]>([])

  const { data, isLoading, error } = useSwr(['/lunchers', page, query], () => getLaunches(page, query))

  const allData = useMemo(() => {
    if (allDatas.current.length) {
      if (data?.docs?.length) {
        allDatas.current = [...allDatas.current, ...data.docs]
      }
    } else {
      allDatas.current = data?.docs || []
    }
    return allDatas.current
  }, [data])

  if (data) {
    console.log(data)
  }

  const handleSearch = (value) => {

  };

  if (isLoading) return null

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={allData}
            renderItem={({ item }) => <Card data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View
            style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
