import { fetchResponse } from "../handleResponse";
import * as fetchConfig from "../handleConfigVars";

describe("fetchResponse", () => {
  test("if assetsStorageType is local and responsesStorageType is download, should return null if ParticipantInfo is not found in localStorage", async () => {
    // mock test data
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      assetsStorageType: "local",
      responsesStorageType: "download",
    });
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });

  test("if assetsStorageType is local and responsesStorageType is download, should return null if ParticipantInfo is found in localStorage but ParticipantId is not the same", async () => {
    // mock test data
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      assetsStorageType: "local",
      responsesStorageType: "download",
    });
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(
      JSON.stringify({
        ParticipantId: "testId2",
      })
    );

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });

  test("if assetsStorageType is local and responsesStorageType is download, should return the response object if all the needed items are found in localStorage", async () => {
    // mock test data
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      assetsStorageType: "local",
      responsesStorageType: "download",
    });
    // mock these items in localStorage one by one
    const mockResponse = [
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      [],
      {},
      [],
    ];
    mockResponse.map((item) => {
      jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(JSON.stringify(item));
    });

    const result = await fetchResponse("testId");
    const expected = {
      CaseOrder: [],
      ParticipantInfo: { ParticipantId: "testId" },
      SessionInfo: {},
      ValidCaseFiles: [],
    };
    expect(result).toEqual(expected);
  });

  test("if assetsStorageType is local and responsesStorageType is download, should return null if one of the needed items is missing in localStorage", async () => {
    // mock test data
    fetchConfig.fetchConfigVariable = jest.fn().mockReturnValue({
      assetsStorageType: "local",
      responsesStorageType: "download",
    });
    // mock these items in localStorage one by one
    const mockResponse = [
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      {
        ParticipantId: "testId",
      },
      [],
      {},
    ];
    mockResponse.map((item) => {
      jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(JSON.stringify(item));
    });

    const result = await fetchResponse("testId");
    expect(result).toBeNull();
  });
});
