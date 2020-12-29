import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useHistory } from "react-router-native";
import Text from "./Text";
import ReviewItem from "./ReviewItem";
import theme from "../theme";
import formatInThousands from "../utils/formatInThousands";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  countItem: {
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  languageText: {
    color: "white",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
});

const CountItem = ({ label, count }) => {
  return (
    <View style={styles.countItem}>
      <Text
        testID='repositoryCounts'
        style={styles.countItemCount}
        fontWeight='bold'
      >
        {formatInThousands(count)}
      </Text>
      <Text color='textSecondary'>{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ repository, reviews, onEndReach }) => {
  let reviewsData;
  const history = useHistory();
  const {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = repository;

  const repositoryPress = () => {
    history.push(`/${id}`);
  };

  const RepositoryInfo = () => {
    return (
      <TouchableOpacity onPress={repositoryPress}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
            </View>
            <View style={styles.contentContainer}>
              <Text
                testID='repositoryName'
                style={styles.nameText}
                fontWeight='bold'
                fontSize='subheading'
                numberOfLines={1}
              >
                {fullName}
              </Text>
              <Text
                testID='repositoryDescription'
                style={styles.descriptionText}
                color='textSecondary'
              >
                {description}
              </Text>
              {language ? (
                <View style={styles.languageContainer}>
                  <Text testID='repositoryLanguage' style={styles.languageText}>
                    {language}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <CountItem count={stargazersCount} label='Stars' />
            <CountItem count={forksCount} label='Forks' />
            <CountItem count={reviewCount} label='Reviews' />
            <CountItem count={ratingAverage} label='Rating' />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!reviews) {
    reviewsData = [];
  } else {
    reviewsData = reviews.edges;
  }

  return (
    <FlatList
      data={reviewsData}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryItem;
