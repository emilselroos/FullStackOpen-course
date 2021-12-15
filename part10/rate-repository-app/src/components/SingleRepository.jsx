import React from 'react';
import { FlatList, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import { useParams } from "react-router-dom";

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';

const SingleRepositoryContainer = ({ repository, reviews, handleFetchMore }) => {

    // Get the nodes from the edges array
	const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
            ListHeaderComponent={() => <RepositoryItem item={repository} extended={true} />}
            keyExtractor={({ id }) => id}
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} />}
            onEndReached={handleFetchMore}
			onEndReachedThreshold={0.5}
        />
    );
}

const SingleRepository = () => {

    const { id } = useParams();

    const { data, loading, fetchMore } = useQuery(GET_SINGLE_REPOSITORY, {
		fetchPolicy: 'cache-and-network',
        variables: {
            repositoryId: id,
            first: 8,
        }
	});

    const handleFetchMore = () => {

		const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

		if (!canFetchMore) {
            return;
        }

		fetchMore({
			variables: {
				repositoryId: id,
                first: 8,
				after: data.repository.reviews.pageInfo.endCursor,
			},
		});
	};

    if (!data) {
        return (
            <Text>Loading...</Text>
        );
    }
    
    return (
        <SingleRepositoryContainer
            repository={data.repository}
            reviews={data.repository.reviews}
            handleFetchMore={handleFetchMore}
        />
    );
}

export default SingleRepository;