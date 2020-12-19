import { NodeEventToNodePipe } from './node-event-to-node.pipe';
import { testStorageFileNode } from '../../entities/storage-node.spec';
import { NodeCreatedEvent } from '../../entities/node-created-event';

describe('NodeEventToNodePipe', () => {
  it('create an instance', () => {
    const pipe = new NodeEventToNodePipe();

    expect(pipe).toBeTruthy();

    const node = testStorageFileNode();

    expect(pipe.transform(new NodeCreatedEvent(node))).toBe(node);
  });
});
