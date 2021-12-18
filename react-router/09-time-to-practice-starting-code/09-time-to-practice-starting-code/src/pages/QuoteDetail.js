import React, { useEffect } from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';


const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();
    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);
    const {quoteId} = params;

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === 'pending') {
        return <p className="centered">
            <LoadingSpinner />
        </p>
    }

    if (error) {
        return <p className="centered">{error}</p>
    }
    if (!loadedQuote) {
        return <p className='centered'>No Quote Found.</p>
    }
    return (
        <div>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`} exact>
                <Comments />
            </Route>
        </div>
    );
};

export default QuoteDetail;