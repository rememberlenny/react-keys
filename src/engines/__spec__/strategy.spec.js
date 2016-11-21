import sinon from 'sinon';
import { EXIT_STRATEGY_MEMORY, EXIT_STRATEGY_MIRROR, EXIT_STRATEGY_START } from '../../constants';
import { findMirrorExitId, findStartExitId, findIdByStrategy } from '../strategy';

describe('strategy', () => {

  describe('findIdByStrategy', () => {

    it('should return selectedId when strategy is memory', sinon.test(function() {
      const canvas = document.createElement('canvas');
      this.stub(document, 'getElementById').returns(canvas);
      const id = 'xoxo';
      const state = {
        'myId': {
          selectedId: id,
          enterStrategy: EXIT_STRATEGY_MEMORY,
        }
      };
      findIdByStrategy(state, 'myId', {}).should.equal(id);
    }));

    it('should return mirrorId on strategy mirror', sinon.test(function() {
      const canvas = document.createElement('canvas');
      const firstElement = document.createElement('li');
      firstElement.setAttribute('id', 'elOne');
      this.stub(firstElement, 'getBoundingClientRect').returns({ left: 10 });
      const secondElement = document.createElement('li');
      secondElement.setAttribute('id', 'elTwo');
      this.stub(secondElement, 'getBoundingClientRect').returns({ left: 0 });
      canvas.appendChild(firstElement);
      canvas.appendChild(secondElement);

      this.stub(document, 'getElementById').returns(canvas);
      const state = {
        'myId': {
          selectedId: 'xoxo',
          enterStrategy: EXIT_STRATEGY_MIRROR,
          selector: 'li',
        }
      };
      findIdByStrategy(state, 'myId', {}).should.equal('elTwo');
    }));

    it('should return startId on start id', sinon.test(function() {
      const canvas = document.createElement('canvas');
      const firstElement = document.createElement('li');
      firstElement.setAttribute('id', 'elOne');
      this.stub(firstElement, 'getBoundingClientRect').returns({ left: 10 });
      const secondElement = document.createElement('li');
      secondElement.setAttribute('id', 'elTwo');
      this.stub(secondElement, 'getBoundingClientRect').returns({ left: 0 });
      canvas.appendChild(firstElement);
      canvas.appendChild(secondElement);

      this.stub(document, 'getElementById').returns(canvas);
      const state = {
        'myId': {
          selectedId: 'xoxo',
          enterStrategy: EXIT_STRATEGY_START,
          selector: 'li',
        }
      };
      findIdByStrategy(state, 'myId', {}).should.equal('elOne');
    }));

  });

  describe('findMirrorExitId', () => {

    it('should find mirrored id', () => {
      const leftElement = { getBoundingClientRect: () => ({ left: 20 }) };
      const children = [
        { id: '1', getBoundingClientRect: () => ({ left: 0 }) },
        { id: '2', getBoundingClientRect: () => ({ left: 10 }) },
        { id: '3', getBoundingClientRect: () => ({ left: 20 }) },
        { id: '4', getBoundingClientRect: () => ({ left: 30 }) },
      ];
      findMirrorExitId(leftElement, children, 'left').should.equal('3');
    });

  });

  describe('findStartExitId', () => {

    it('should find first started id', () => {
      const dom = { getBoundingClientRect: () => ({ left: 15 }) };
      const children = [
        { id: '1', getBoundingClientRect: () => ({ left: 0 }) },
        { id: '2', getBoundingClientRect: () => ({ left: 10 }) },
        { id: '3', getBoundingClientRect: () => ({ left: 20 }) },
        { id: '4', getBoundingClientRect: () => ({ left: 30 }) },
      ];
      findStartExitId(children, dom, 'left').should.equal('3');
    });

  });

});