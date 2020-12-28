import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const Dropdown = ({ setSortBy }) => {
  return (
    <RNPickerSelect
      placeholder={{
        label: "Sort repositories...",
        value: null,
      }}
      onValueChange={(value) => setSortBy(value)}
      items={[
        { label: "Latest repositories", value: "CREATED_AT" },
        { label: "Highest rated repositories", value: "DESC" },
        { label: "Lowest rated repositories", value: "ASC" },
      ]}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, setSortBy }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      ListHeaderComponent={() => <Dropdown setSortBy={setSortBy} />}
      testID='repositoryItem'
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("");
  console.log(sortBy);
  const { repositories } = useRepositories(sortBy);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setSortBy={setSortBy}
    />
  );
};

export default RepositoryList;
