import React from "react"
import ReactDOM from 'react-dom'
import './styles.css';

function Menu() {
    const [sites, setSites] = React.useState([
        { name: 'xbmp', url: 'http://xbmp.org' },
        { name: 'youtube', url: 'http://youtube.com' },
        { name: 'cnn', url: 'http://cnn.com' },
        { name: 'Github', url: 'https://github.com/Dada01Github' },
        { name: 'AI', url: 'https://devv.ai/zh/search?threadId=d539jtc4hvy8' },
        { name: 'BOOK', url: 'D:/Documents/Desktop/homeworl_lzq/books/on-regularinvesting-en.pdf' },


    ]);
    const [showModal, setShowModal] = React.useState(false);
    const [newSiteName, setNewSiteName] = React.useState('');
    const [newSiteUrl, setNewSiteUrl] = React.useState('');
    const [contextMenuSite, setContextMenuSite] = React.useState(null);
    const [contextMenuPosition, setContextMenuPosition] = React.useState({ x: 0, y: 0 });
    const [searchValue, setSearchValue] = React.useState('');

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    const clearSearch = () => {
        setSearchValue('');
    }
    const handleSearch = (event) => {
        event.preventDefault();
        const searchQuery = event.target.elements.search.value;
        const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        openInNewTab(url);
    };

    const addSite = () => {
        let formattedUrl = newSiteUrl;
        if (newSiteName && newSiteUrl) {
            if (!/^https?:\/\//i.test(newSiteUrl)) {
                if (!/^(file|File)/i.test(newSiteUrl)) {
                    formattedUrl = 'https://' + newSiteUrl;
                } else {
                    formattedUrl = newSiteUrl;
                }
            }

            // if (newSiteName && newSiteUrl) {
            // if (!/^https?:\/\//i.test(newSiteUrl)) {
            // formattedUrl = 'http://' + newSiteUrl;
            // }
            setSites([...sites, { name: newSiteName, url: formattedUrl }]);
            setShowModal(false);
            setNewSiteName('');
            setNewSiteUrl('');
        }
    };

    const handleContextMenu = (event, site) => {
        event.preventDefault();
        setContextMenuSite(site);
        setContextMenuPosition({ x: event.pageX, y: event.pageY });
        document.getElementById('context-menu').style.display = 'block';
    };

    const closeContextMenu = () => {
        document.getElementById('context-menu').style.display = 'none';
    };

    const editSite = () => {
        // Logic to edit the selected site
        const editedName = prompt("Enter the new name for the site", contextMenuSite.name);
        const editedUrl = prompt("Enter the new URL for the site", contextMenuSite.url);
        if (editedName && editedUrl) {
            setSites(sites.map(site => site.url === contextMenuSite.url ? { ...site, name: editedName, url: editedUrl } : site));
        }
        closeContextMenu();
    };

    const deleteSite = () => {
        setSites(sites.filter(s => s.url !== contextMenuSite.url));
        closeContextMenu();
    };

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                // 执行取消操作的逻辑
                setShowModal(false); // 关闭模态框
                // 其他取消操作的逻辑...
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // 空数组表示只在组件挂载和卸载时执行

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center" onClick={closeContextMenu}>
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <form onSubmit={handleSearch} className="flex justify-between items-center mb-6">
                    <div className="relative flex items-center w-full mr-2">
                        <input
                            name="search"
                            type="text"
                            placeholder="search"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            className="border p-2 w-full"
                        />
                        {searchValue && (
                            <button type="button" className="absolute right-0 mr-2 text-red-800" onClick={clearSearch}>
                                X
                            </button>
                        )}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-2 py-2 rounded">
                        🔎
                    </button>
                </form>
                <div className="grid grid-cols-5 gap-10 mx-auto px-70">
                    {sites.map((site, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-lg text-center" style={{ height: '100px' }} onClick={() => openInNewTab(site.url)} onContextMenu={(e) => handleContextMenu(e, site)}>
                            <div className="flex items-center justify-center h-20 w-20 bg-blue-500 text-white rounded-full text-5xl font-bold mb-4 cursor-pointer">
                                {site.name.charAt(0).toUpperCase()}
                            </div>
                            <p className="cursor-pointer font-bold text-green-300 text-1.5xl">{site.name}</p>
                        </div>
                    ))}

                    <div className="bg-white p-4 rounded-lg shadow-lg text-center flex items-center justify-center cursor-pointer" onClick={() => setShowModal(true)}>

                        {/*<span class="text-10xl text-blue-500 bg-border-green-300">+</span>
                        <i className="fas fa-plus text-6xl text-blue-500 bg-border-green-300 "></i>
                        */}

                        <span style={{ fontSize: '3em', fontWeight: 'bold', color: 'blue', backgroundColor: 'white' }}>+</span>

                    </div>
                    <div id="context-menu" className="context-menu" style={{
                        top: contextMenuPosition.y,
                        left: contextMenuPosition.x
                    }}>
                        <div className="cursor-pointer" onClick={editSite}>修改</div>
                        <div className="cursor-pointer" onClick={deleteSite}>删除</div>
                    </div>
                </div>

            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">添加新网址</h3>
                            <div className="mt-2 px-7 py-3">
                                <input type="text" placeholder="网址名称" className="mb-3 px-3 py-2 border rounded w-full" value={newSiteName} onChange={(e) => setNewSiteName(e.target.value)} />
                                <input type="text" placeholder="链接网址" className="mb-3 px-3 py-2 border rounded w-full" value={newSiteUrl} onChange={(e) => setNewSiteUrl(e.target.value)} />
                            </div>
                            <div className="items-center px-4 py-3">
                                <button id="ok-btn" onClick={addSite} className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">
                                    ADD
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

//ReactDOM.render(<Menu />, document.getElementById('menu'));
export default Menu;
