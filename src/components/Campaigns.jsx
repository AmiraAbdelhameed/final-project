import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCampaigns } from '../redux/Slices/campaignsSlice';

const Campaigns  = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCampaigns());
    }, [dispatch]);

    const { data, loading, error } = useSelector((state) => state.campaigns);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {data.map((campaign) => (
                <li key={campaign.id}>{campaign.title}</li>
            ))}
        </ul>
    );
};
export default Campaigns 