import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import TextInput from "./TextInput";
import { useDebounce } from "use-debounce";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const FilterText = ({ setFilterText }) => {
  return (
    <TextInput
      onChangeText={(text) => setFilterText(text)}
      placeholder='Filter repositories...'
      style={{ margin: 1 }}
    />
  );
};

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
      style={{ margin: 1 }}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <View>
        <Dropdown setSortBy={props.setSortBy} />
        <FilterText setFilterText={props.setFilterText} />
      </View>
    );
  };

  render() {
    const repositories = this.props.repositories;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        testID='repositoryItem'
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterTextValue] = useDebounce(filterText, 500);

  const { repositories } = useRepositories(sortBy, filterTextValue);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setSortBy={setSortBy}
      setFilterText={setFilterText}
    />
  );
};

export default RepositoryList;

// export const RepositoryListContainer = ({
//   repositories,
//   setSortBy,
//   setFilterText,
// }) => {
//   const repositoryNodes = repositories
//     ? repositories.edges.map((edge) => edge.node)
//     : [];

//   return (
//     <FlatList
//       ListHeaderComponent={() => (
//         <View>
//           <Dropdown setSortBy={setSortBy} />
//           <FilterText setFilterText={setFilterText} />
//         </View>
//       )}
//       testID='repositoryItem'
//       data={repositoryNodes}
//       keyExtractor={({ id }) => id}
//       renderItem={({ item }) => <RepositoryItem repository={item} />}
//       ItemSeparatorComponent={ItemSeparator}
//     />
//   );
// };
