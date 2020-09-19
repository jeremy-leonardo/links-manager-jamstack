import React from 'react';

export default function LinkCard({ link, refreshLinks }) {

    const archiveLink = async () => {
        link.archived = true;
        try {
            await fetch('/.netlify/functions/updateLink', {
                method: 'PUT',
                body: JSON.stringify(link)
            });
            refreshLinks();
        } catch (error) {
            console.error('An error occured');
        }
    }

    const deleteLink = async () => {
        const id = link._id;
        try {
            await fetch('/.netlify/functions/deleteLink', {
                method: 'DELETE',
                body: JSON.stringify({ id })
            });
            refreshLinks();
        } catch (error) {
            console.error('An error occured');
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                {link.name}
            </div>
            <div className="card-body">
                <a href={link.url}>{link.url}</a>
                <p>{link.description}</p>
            </div>
            <div className="card-footer">
                { !link.archived ?
                    (
                        <button className="btn btn-warning mr-2" onClick={archiveLink}>
                            Archive
                        </button>
                    ) : ('')
                }
                <button className="btn btn-danger" onClick={deleteLink}>
                    Delete
                </button>
            </div>
        </div>
    );
}