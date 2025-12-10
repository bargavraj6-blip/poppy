// Sample Data
const posts = [
    {
        id: 1,
        type: 'text',
        user: 'Jamoe sora',
        avatar: 'https://i.pravatar.cc/100?img=1',
        time: '25 minute ago',
        location: 'Surat, Gujarat',
        rating: 4.3,
        text: 'I used to Jump Straight into visuals. Open Figma. Start Designing. Ship it fast! used to Jump Straight into visuals. Open Figma. Start Designing. Ship it fast.',
        likes: 12,
        dislikes: 2,
        comments: 1
    },
    {
        id: 2,
        type: 'image',
        user: 'Jamoe sora',
        avatar: 'https://i.pravatar.cc/100?img=2',
        time: '25 minute ago',
        location: 'Surat, Gujarat',
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
        imageCount: '1/2',
        text: 'I used to Jump Straight into visuals. Open Figma. Start Designing. Ship it fast!',
        likes: 12,
        dislikes: 2,
        comments: 1
    },
    {
        id: 3,
        type: 'text',
        user: 'Jamoe sora',
        avatar: 'https://i.pravatar.cc/100?img=3',
        time: '25 minute ago',
        location: 'Surat, Gujarat',
        rating: 4.3,
        text: 'Amazing design patterns and user experience guidelines for modern applications.',
        likes: 25,
        dislikes: 3,
        comments: 8
    },
    {
        id: 4,
        type: 'video',
        user: 'Jamoe sora',
        avatar: 'https://i.pravatar.cc/100?img=4',
        time: '25 minute ago',
        location: 'Surat, Gujarat',
        rating: 4.3,
        video: 'https://cdn.pixabay.com/video/2024/01/29/198719-909143449_large.mp4',
        text: 'I used to Jump Straight into visuals. Open Figma. Start Designing. Ship it fast!',
        likes: 89,
        dislikes: 5,
        comments: 23
    },
    {
        id: 5,
        type: 'image',
        user: 'Jamoe sora',
        avatar: 'https://i.pravatar.cc/100?img=5',
        time: '25 minute ago',
        location: 'Surat, Gujarat',
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
        imageCount: '1/2',
        likes: 45,
        dislikes: 7,
        comments: 15
    },
    {
        id: 6,
        type: 'text',
        user: 'Jamoe sora',
        avatar: 'https://i.pravatar.cc/100?img=6',
        time: '25 minute ago',
        location: 'Surat, Gujarat',
        rating: 4.3,
        text: 'Beautiful sunset views from the mountains. Nature is truly amazing and inspiring every single day.',
        likes: 67,
        dislikes: 4,
        comments: 32
    },
    {
        id: 7,
        type: 'video',
        user: 'Jamoe sora',
        avatar: 'https://i.pravatar.cc/100?img=7',
        time: '25 minute ago',
        location: 'Surat, Gujarat',
        rating: 4.3,
        video: 'https://cdn.pixabay.com/video/2022/11/07/138817-768747034_large.mp4',
        likes: 120,
        dislikes: 8,
        comments: 45
    },
    {
        id: 8,
        type: 'image',
        user: 'Jamoe sora',
        avatar: 'https://i.pravatar.cc/100?img=8',
        time: '25 minute ago',
        location: 'Surat, Gujarat',
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop',
        imageCount: '1/2',
        text: 'Exploring new horizons and discovering beautiful landscapes around the world.',
        likes: 98,
        dislikes: 6,
        comments: 28
    }
];

const comments = [
    {
        user: 'Robert Anderson',
        avatar: 'https://i.pravatar.cc/50?img=11',
        time: '25 Minutes ago',
        text: "I'm interested",
        likes: 12
    },
    {
        user: 'Jonah Clark',
        avatar: 'https://i.pravatar.cc/50?img=12',
        time: '2 Year ago',
        text: "I'm interested",
        likes: 12
    },
    {
        user: 'Robert Anderson',
        avatar: 'https://i.pravatar.cc/50?img=13',
        time: '1 Hour ago',
        text: "I'm interested",
        likes: 12
    }
];

// Elements
const feed = document.getElementById('feed');
const locationBtn = document.getElementById('locationBtn');
const addBtn = document.getElementById('addBtn');
const createOverlay = document.getElementById('createOverlay');
const commentsModal = document.getElementById('commentsModal');
const shareModal = document.getElementById('shareModal');
const threeDotMenu = document.getElementById('threeDotMenu');
const externalShareModal = document.getElementById('externalShareModal');
const circleTransition = document.getElementById('circleTransition');

// State
let currentPostId = null;
let likedPosts = {};
let dislikedPosts = {};

// Generate Posts
function generatePosts() {
    feed.innerHTML = '';
    posts.forEach(post => {
        const postCard = createPostCard(post);
        feed.appendChild(postCard);
    });
}

function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.postId = post.id;

    let mediaHTML = '';
    if (post.type === 'image') {
        mediaHTML = `
            <div class="post-media" data-type="image">
                <img src="${post.image}" alt="Post image">
                ${post.imageCount ? `<div class="media-badge">${post.imageCount}</div>` : ''}
            </div>
        `;
    } else if (post.type === 'video') {
        mediaHTML = `
            <div class="post-media video-media" data-video-id="${post.id}">
                <video loop muted playsinline>
                    <source src="${post.video}" type="video/mp4">
                </video>
                <div class="play-overlay">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>
                <button class="volume-btn">🔊</button>
            </div>
        `;
    }

    card.innerHTML = `
        <div class="post-header">
            <img src="${post.avatar}" alt="${post.user}" class="post-avatar">
            <div class="post-user-info">
                <div class="post-username">${post.user}</div>
                <div class="post-meta">${post.time} • ${post.location}</div>
            </div>
            <div class="post-rating">
                <svg viewBox="0 0 24 24" fill="#EF4444">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span>(${post.rating})</span>
            </div>
            <button class="post-more-btn" data-post-id="${post.id}">⋮</button>
        </div>
        ${mediaHTML}
        ${post.text ? `
        <div class="post-content">
            <div class="post-text">${post.text}</div>
            <button class="read-more">...More</button>
        </div>
        ` : ''}
        <div class="post-actions">
            <button class="action-btn upvote-btn" data-post-id="${post.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
                <span>${post.likes}</span>
            </button>
            <button class="action-btn downvote-btn" data-post-id="${post.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
                <span>${post.dislikes}</span>
            </button>
            <button class="action-btn comment-btn" data-post-id="${post.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>${post.comments}</span>
            </button>
            <button class="action-btn share-btn" data-post-id="${post.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
            </button>
            <button class="location-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#EF4444">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
                Location
            </button>
        </div>
    `;

    return card;
}

// Circle Transition Animation
function circleTransitionTo(url) {
    circleTransition.classList.add('active');
    setTimeout(() => {
        window.location.href = url;
    }, 600);
}

// Location Button - Circle Transition to Map
locationBtn.addEventListener('click', () => {
    circleTransitionTo('map.html');
});

// Add Button
addBtn.addEventListener('click', () => {
    addBtn.classList.toggle('active');
    createOverlay.classList.toggle('active');
});

createOverlay.addEventListener('click', (e) => {
    if (e.target === createOverlay) {
        addBtn.classList.remove('active');
        createOverlay.classList.remove('active');
    }
});

document.querySelectorAll('.create-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const type = btn.dataset.type;
        alert(`Create ${type} - Coming soon!`);
        addBtn.classList.remove('active');
        createOverlay.classList.remove('active');
    });
});

// Event Delegation for dynamic content
document.addEventListener('click', (e) => {
    // Read More
    if (e.target.classList.contains('read-more')) {
        const textEl = e.target.previousElementSibling;
        if (textEl.classList.contains('expanded')) {
            textEl.classList.remove('expanded');
            e.target.textContent = '...More';
        } else {
            textEl.classList.add('expanded');
            e.target.textContent = 'Show less';
        }
    }

    // Three Dot Menu
    if (e.target.classList.contains('post-more-btn')) {
        const postId = e.target.dataset.postId;
        const rect = e.target.getBoundingClientRect();
        threeDotMenu.style.top = `${rect.bottom + 8}px`;
        threeDotMenu.style.right = `16px`;
        threeDotMenu.classList.add('active');
        currentPostId = postId;
        e.stopPropagation();
    }

    // Upvote
    if (e.target.closest('.upvote-btn')) {
        const btn = e.target.closest('.upvote-btn');
        const postId = btn.dataset.postId;
        const countEl = btn.querySelector('span');
        let count = parseInt(countEl.textContent);

        if (likedPosts[postId]) {
            delete likedPosts[postId];
            count--;
            btn.classList.remove('active');
        } else {
            likedPosts[postId] = true;
            count++;
            btn.classList.add('active');
            
            if (dislikedPosts[postId]) {
                delete dislikedPosts[postId];
                const downBtn = btn.parentElement.querySelector('.downvote-btn');
                downBtn.classList.remove('active');
                const downCount = downBtn.querySelector('span');
                downCount.textContent = parseInt(downCount.textContent) - 1;
            }
        }
        countEl.textContent = count;
    }

    // Downvote
    if (e.target.closest('.downvote-btn')) {
        const btn = e.target.closest('.downvote-btn');
        const postId = btn.dataset.postId;
        const countEl = btn.querySelector('span');
        let count = parseInt(countEl.textContent);

        if (dislikedPosts[postId]) {
            delete dislikedPosts[postId];
            count--;
            btn.classList.remove('active');
        } else {
            dislikedPosts[postId] = true;
            count++;
            btn.classList.add('active');
            
            if (likedPosts[postId]) {
                delete likedPosts[postId];
                const upBtn = btn.parentElement.querySelector('.upvote-btn');
                upBtn.classList.remove('active');
                const upCount = upBtn.querySelector('span');
                upCount.textContent = parseInt(upCount.textContent) - 1;
            }
        }
        countEl.textContent = count;
    }

    // Comments
    if (e.target.closest('.comment-btn')) {
        const postId = e.target.closest('.comment-btn').dataset.postId;
        openComments(postId);
    }

    // Share (App Users)
    if (e.target.closest('.share-btn')) {
        const postId = e.target.closest('.share-btn').dataset.postId;
        shareModal.classList.add('active');
    }

    // Video Click - Go to video page with circle transition
    if (e.target.closest('.video-media')) {
        const videoId = e.target.closest('.video-media').dataset.videoId;
        circleTransitionTo(`video.html?id=${videoId}`);
    }

    // Close modals when clicking outside
    if (e.target === commentsModal) {
        commentsModal.classList.remove('active');
    }
    if (e.target === shareModal) {
        shareModal.classList.remove('active');
    }
    if (e.target === externalShareModal) {
        externalShareModal.classList.remove('active');
    }

    // Close three dot menu
    if (!e.target.closest('.post-more-btn') && !e.target.closest('.three-dot-menu')) {
        threeDotMenu.classList.remove('active');
    }
});

// Three Dot Menu Options
document.querySelectorAll('.menu-option').forEach(option => {
    option.addEventListener('click', (e) => {
        const action = option.dataset.action;
        
        if (action === 'share-external') {
            externalShareModal.classList.add('active');
            threeDotMenu.classList.remove('active');
        } else if (action === 'save') {
            alert('Post saved!');
            threeDotMenu.classList.remove('active');
        } else if (action === 'not-interested') {
            alert('Marked as not interested');
            threeDotMenu.classList.remove('active');
        }
    });
});

// External Share Apps
document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('click', () => {
        const app = item.dataset.app;
        if (app === 'copy') {
            alert('Link copied to clipboard!');
        } else {
            alert(`Sharing to ${app}...`);
        }
        externalShareModal.classList.remove('active');
    });
});

// User Selection in Share Modal
document.querySelectorAll('.user-item').forEach(item => {
    item.addEventListener('click', () => {
        const checkbox = item.querySelector('.checkbox');
        checkbox.classList.toggle('checked');
    });
});

// Send Button in Share Modal
document.querySelector('.send-button').addEventListener('click', () => {
    const selected = document.querySelectorAll('.checkbox.checked').length;
    if (selected > 0) {
        alert(`Shared with ${selected} user(s)!`);
        shareModal.classList.remove('active');
        document.querySelectorAll('.checkbox').forEach(cb => cb.classList.remove('checked'));
        document.querySelectorAll('.checkbox')[0].classList.add('checked');
    }
});

// Open Comments Modal
function openComments(postId) {
    currentPostId = postId;
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';
    
    comments.forEach(comment => {
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.innerHTML = `
            <img src="${comment.avatar}" alt="${comment.user}" class="comment-avatar">
            <div class="comment-body">
                <div>
                    <span class="comment-user">${comment.user}</span>
                    <span class="comment-time">${comment.time}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-actions-row">
                    <button class="comment-action">❤️ ${comment.likes}</button>
                    <button class="comment-action">Reply</button>
                </div>
            </div>
        `;
        commentsList.appendChild(commentItem);
    });
    
    document.getElementById('commentCount').textContent = comments.length;
    commentsModal.classList.add('active');
}

// Send Comment
document.querySelector('.send-btn').addEventListener('click', () => {
    const input = document.querySelector('.comment-input');
    if (input.value.trim()) {
        alert('Comment posted!');
        input.value = '';
    }
});

// Video Auto Play
function setupVideoAutoPlay() {
    const videos = document.querySelectorAll('.video-media video');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => observer.observe(video));
}

// Location Button in Post
document.addEventListener('click', (e) => {
    if (e.target.closest('.location-btn')) {
        circleTransitionTo('map.html');
    }
});

// Chat Button
document.getElementById('chatBtn').addEventListener('click', () => {
    circleTransitionTo('message.html');
});

// Notification Button
document.getElementById('notifBtn').addEventListener('click', () => {
    alert('Notifications - Coming soon!');
});

// Initialize
generatePosts();
setTimeout(() => {
    setupVideoAutoPlay();
}, 100);