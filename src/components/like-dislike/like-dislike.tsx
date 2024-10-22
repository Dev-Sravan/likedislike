import React, { useState } from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ReplayIcon from '@mui/icons-material/Replay';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const Likedislike: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [isLike, setIsLike] = useState<boolean>(false);
    const [isDisLike, setIsDisLike] = useState<boolean>(false);
    const [isShare, setIsShare] = useState<boolean>(false);
    const [isRegenerate, setIsRegenerate] = useState<boolean>(false);

    // Handle Like button logic
    const handleLike = async () => {
        setIsLike(!isLike);  // Toggle like state
        setIsDisLike(false);  // Ensure dislike is reset to false
    
        try {
            const response = await fetch('http://127.0.0.1:8000/like', {
                method: 'POST',
            });
            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                setMessage('Error toggling like');
            }
        } catch (error) {
            setMessage('Error toggling like');
        }
    };

    // Handle Dislike button logic
    const handleDislike = async () => {
        setIsDisLike(!isDisLike); // Toggle dislike state
        setIsLike(false);  // Ensure like is reset to false

        try {
            const response = await fetch('http://127.0.0.1:8000/dislike', {
                method: 'POST',
            });
            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                setMessage('Error disliking');
            }
        } catch (error) {
            setMessage('Error disliking');
        }
    };

    // Handle Share button logic
    const handleShare = async () => {
        setIsShare(!isShare);  // Toggle share state

        try {
            const response = await fetch('http://127.0.0.1:8000/share', {
                method: 'POST',
            });
            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                setMessage('Error sharing');
            }
        } catch (error) {
            setMessage('Error sharing');
        }
    };

    // Handle Regenerate button logic
    const handleRegenerate = async () => {
        setIsRegenerate(!isRegenerate);  // Toggle regenerate state

        try {
            const response = await fetch('http://127.0.0.1:8000/regenerate', {
                method: 'POST',
            });
            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                setMessage('Error regenerating');
            }
        } catch (error) {
            setMessage('Error regenerating');
        }
    };

    return (
        <div>
            <Tooltip title="Like" placement="top-end" arrow>
                <IconButton onClick={handleLike} style={{
                    color: isLike ? 'blue' : 'grey'  // Blue on odd clicks, grey on even clicks
                }}>
                    <ThumbUpAltOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Dislike" placement="top-end" arrow>
                <IconButton onClick={handleDislike} style={{
                    color: isDisLike ? 'blue' : 'grey'  // Blue on odd clicks, grey on even clicks
                }}>
                    <ThumbDownAltOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Share" placement="top-end" arrow>
                <IconButton onClick={handleShare} color="default" style={{
                    color: isShare ? 'blue' : 'grey'  // Toggle between blue and grey
                }}>
                    <ShareIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Regenerate" placement="top-end" arrow>
                <IconButton onClick={handleRegenerate} color="default" style={{
                    color: isRegenerate ? 'blue' : 'grey'  // Toggle between blue and grey
                }}>
                    <ReplayIcon />
                </IconButton>
            </Tooltip>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Likedislike;
