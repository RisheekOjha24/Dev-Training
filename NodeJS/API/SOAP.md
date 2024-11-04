# SOAP (Simple Object Access Protocol)

## Protocol:
SOAP is a protocol for exchanging structured information in the implementation of web services.

## Data Format: 
Uses XML exclusively for message format, which can make it more verbose compared to JSON.

## Transport Protocols: 
Can be used over various protocols, including HTTP, SMTP,FTP and more, but is often paired with HTTP.

## Statefulness: 
Can be either stateless or stateful, allowing for sessions and transactions.

## Security: 
Built-in security features like WS-Security, which provides message-level security (encryption, signing).

Typically used in enterprise-level services, financial services, and situations requiring high security and reliability.

## WSDL (Web Services Description Language):

SOAP services are often described using WSDL, which is an XML document that defines the service's operations, input and output parameters, and how to call them.

## A typical SOAP message consists of the following elements:

### Envelope: 
The root element that identifies the XML document as a SOAP message.

### Header (optional): 
Contains application-specific information (like authentication) that is used by the SOAP message processor.

### Body: 
Contains the actual message being sent (the data or instructions), including the request and response data.

### Fault (optional): 
Used for error handling; it provides information about any errors that occur during processing.

```
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Header>
        <Authentication>
            <Username>user</Username>
            <Password>pass</Password>
        </Authentication>
    </soap:Header>
    <soap:Body>
        <AddItemRequest xmlns="http://example.com/ItemService">
            <Item>
                <Name>New Item</Name>
                <Description>This is a new item.</Description>
            </Item>
        </AddItemRequest>
    </soap:Body>
</soap:Envelope>
```

## Consider a shopping cart application using a SOAP service:

### User Adds Item:
The user adds an item to their cart. The server creates a session and stores the cart's current state (e.g., items, quantities) in memory or a database, associating it with the user's session ID.

### Multiple Requests: 
As the user continues to add more items, the client sends multiple requests, including the session ID. The server retrieves the session data associated with that ID, allowing it to update the cart without needing the client to resend all the cart details each time.

### Completing Checkout:
When the user is ready to check out, the server uses the stored session state to process the order, knowing exactly what items are in the cart and any other relevant state information.

## How State is Stored
Session ID: When a client makes an initial request to a SOAP service, the server may create a unique session ID. This ID is sent back to the client as part of the response. The client must include this session ID in subsequent requests to indicate which session the request pertains to.

In-Memory Storage or Database: The server uses the session ID to look up session information, which can be stored in memory or in a database. This information might include user authentication status, previous request data, or any other contextual information that the service needs to maintain between requests.