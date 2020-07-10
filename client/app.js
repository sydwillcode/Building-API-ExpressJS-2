$(document).ready(() => {
    fetchChirps();    
});

const fetchChirps = () => {
    $("#chirp-container").empty();

    $.get("/api/chirps", chirps => {
        //Nextid property that we don't need in the array
        delete chirps.nextid;
        //JS to array is Object.entries
        let chirpsArray = Object.entries(chirps);    
        console.log(chirpsArray)
        //Reverse array so  most recent entry is at beginning
        chirpsArray.reverse();
    
    chirpsArray.forEach(chirp => {
        /* for each chirp, chirp[1] refers to the object containing the user & message properties. chirp[0] refers to the entire id due to chirpstore logic */
        $('#chirp-container').append(
           `
             <div class="card w-75">
                <div class="card-body">
                    <h5 class="card-title">${chirp[1].username}</h5>
                    <p class="card-text">${chirp[1].message}</p>
                    <button onclick="" data-toggle="modal" data-target="#modal${chirp[0]}" class ="edit-btn btn btn-info">Edit</button>
                    <button onclick="deleteChirp(${chirp[0]})" class="remove-chirp btn btn-danger">Delete</button>
                    </div>
            </div>
            
            <div id="modal${chirp[0]}" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${chirp[1].username}</h5>
                            <button type="button" class="close"         data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <textarea id="edit-message${chirp[0]}">${chirp[1].message}</textarea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button 
                                onclick="editChirp( 
                                    ${chirp[0]}, 
                                    '${chirp[1].username}', 
                                    $('#edit-message${chirp[0]}').val()
                                )" 
                               type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
         `
            )        
        })
    })
}

//On submit button click, create/post new chirp
const submitChirp = () => {
    //value of corresponding html inputs
    const username = $("#username").val();
    const message = $("#message").val();
    const data = {
        username: username,
        message: message
    };
    //jquery ajax post request 
    $.ajax("/api/chirps/", {
        data: JSON.stringify(data),
        method: "post",
        contentType: "application/json"
    });
    fetchChirps();
}

//jquery ajax request with delete method
const deleteChirp = id => {
    $.ajax(`/api/chirps/${id}`, { method: "delete" });
    fetchChirps();
}

const editChirp = (id, user, message) => {
    const chirpObj = {
        username: user,
        message: message
    }

    $.ajax(`/api/chirps/${id}`, {
        data: JSON.stringify(chirpObj),
        method: "put",
        contentType: "application/json"
    });
    fetchChirps();
}